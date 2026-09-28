#!/usr/bin/env python3
"""
High-Precision Chroma-Key Green Screen Removal & Matting
======================================================
Uses VFX Color-Difference Matting + Automatic Green Despill:
- Analyzes per-pixel excess green: diff = G - max(R, B)
- Creates smooth sub-pixel alpha matting with zero green halos
- Clamps excess green on edge pixels to completely eliminate green fringes
- Preserves clothing shadows, neutral tones, and fine 3D detail
- Safely handles Windows unicode paths
"""

import os
import re
import sys
import argparse
from pathlib import Path
import cv2
import numpy as np


def natural_sort_key(s):
    """Sorts strings containing numbers in numerical order (e.g. 1, 2, ..., 10 or ezgif-frame-001)."""
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', str(s))]


def read_image_utf8(path: Path) -> np.ndarray:
    """Safely reads image files on Windows paths with unicode characters (like em dashes)."""
    with open(path, 'rb') as f:
        bytes_data = np.frombuffer(f.read(), dtype=np.uint8)
        img = cv2.imdecode(bytes_data, cv2.IMREAD_COLOR)
    return img


def write_image_utf8(path: Path, img: np.ndarray) -> bool:
    """Safely writes transparent PNG images on Windows paths with unicode characters."""
    ext = path.suffix.lower()
    success, buffer = cv2.imencode(ext, img)
    if success:
        with open(path, 'wb') as f:
            f.write(buffer)
        return True
    return False


def remove_green_screen_vfx(
    bgr_img: np.ndarray,
    key_low: float = 0.08,
    key_high: float = 0.22,
    despill_factor: float = 1.0,
    blur_kernel: int = 3,
) -> np.ndarray:
    """
    VFX Color-Difference Keying & Despill:
    1. Float normalization [0.0, 1.0]
    2. Color Difference: diff = G - max(R, B)
    3. Continuous Alpha Ramp: soft sub-pixel transition without jagged edges
    4. Complete Green Spill Suppression: turns green edge reflections into natural neutral borders
    """
    img = bgr_img.astype(np.float32) / 255.0
    b = img[:, :, 0]
    g = img[:, :, 1]
    r = img[:, :, 2]

    # 1. Color difference: Excess green above the maximum of Red and Blue
    rb_max = np.maximum(r, b)
    diff = g - rb_max

    # 2. Smooth alpha calculation
    # diff <= key_low  -> alpha = 1.0 (foreground)
    # diff >= key_high -> alpha = 0.0 (background green)
    # intermediate     -> smooth gradient for anti-aliasing
    alpha = 1.0 - np.clip((diff - key_low) / (key_high - key_low), 0.0, 1.0)

    # 3. Green Despill / Halo Suppression
    # Wherever green exceeds max(R, B), subtract the excess to eliminate fringe
    excess_green = np.maximum(0.0, g - rb_max)
    clean_g = g - (excess_green * despill_factor)

    clean_bgr = np.stack([b, clean_g, r], axis=-1)

    # 4. Anti-aliasing edge blur on alpha channel
    if blur_kernel > 1:
        if blur_kernel % 2 == 0:
            blur_kernel += 1
        alpha = cv2.GaussianBlur(alpha, (blur_kernel, blur_kernel), 0)

    # 5. Pack into 4-channel BGRA uint8
    bgra = np.dstack([
        clean_bgr[:, :, 0] * 255.0,
        clean_bgr[:, :, 1] * 255.0,
        clean_bgr[:, :, 2] * 255.0,
        alpha * 255.0,
    ]).clip(0, 255).astype(np.uint8)

    return bgra


def process_frames(
    input_dir: str,
    output_dir: str,
    key_low: float = 0.08,
    key_high: float = 0.22,
    despill: float = 1.0,
):
    input_path = Path(input_dir)
    output_path = Path(output_dir)

    if not input_path.exists():
        print(f"[Error] Input directory does not exist: {input_path}")
        sys.exit(1)

    output_path.mkdir(parents=True, exist_ok=True)

    # Collect .jpg / .jpeg files
    jpg_files = [
        f for f in input_path.iterdir()
        if f.is_file() and f.suffix.lower() in ['.jpg', '.jpeg']
    ]

    # Sort sequentially (1.jpg, 2.jpg ... 10.jpg or ezgif-frame-001.jpg)
    jpg_files.sort(key=lambda p: natural_sort_key(p.name))

    total_files = len(jpg_files)
    if total_files == 0:
        print(f"[Warning] No .jpg files found in: {input_path}")
        return

    print("=" * 68)
    print("VFX Color-Difference Chroma Key & Despill Engine")
    print(f"Input:        {input_path}")
    print(f"Output:       {output_path}")
    print(f"Total Frames: {total_files}")
    print(f"Key Range:    [{key_low:.2f}, {key_high:.2f}], Despill: {despill:.2f}")
    print("=" * 68)

    success_count = 0

    for idx, file_path in enumerate(jpg_files, start=1):
        percent = (idx / total_files) * 100.0
        sys.stdout.write(f"\rProcessing frame {idx}/{total_files} ({percent:5.1f}%) -> {file_path.name}")
        sys.stdout.flush()

        img = read_image_utf8(file_path)
        if img is None:
            print(f"\n[Warning] Could not decode frame: {file_path.name}")
            continue

        transparent_bgra = remove_green_screen_vfx(
            img,
            key_low=key_low,
            key_high=key_high,
            despill_factor=despill,
            blur_kernel=3,
        )

        out_file_name = file_path.stem + ".png"
        out_file_path = output_path / out_file_name

        if write_image_utf8(out_file_path, transparent_bgra):
            success_count += 1
        else:
            print(f"\n[Warning] Failed to save frame: {out_file_name}")

    print(f"\n\n[Done] Successfully processed {success_count}/{total_files} frames.")
    print(f"Transparent PNG sequence saved to: {output_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="VFX Color-Difference Green Screen Removal & Despill."
    )
    
    default_input = r"D:\Downloads\muhammad-hassan-askari-—-software-developer-(ai-&-full-stack)\public\frames"
    default_output = r"D:\Downloads\muhammad-hassan-askari-—-software-developer-(ai-&-full-stack)\public\frames_transparent"

    parser.add_argument("--input", "-i", type=str, default=default_input, help="Input folder with .jpg frames")
    parser.add_argument("--output", "-o", type=str, default=default_output, help="Output folder for transparent .png files")
    parser.add_argument("--key-low", type=float, default=0.08, help="Foreground threshold (default: 0.08)")
    parser.add_argument("--key-high", type=float, default=0.22, help="Background green threshold (default: 0.22)")
    parser.add_argument("--despill", type=float, default=1.0, help="Green despill strength (default: 1.0)")

    args = parser.parse_args()

    process_frames(
        input_dir=args.input,
        output_dir=args.output,
        key_low=args.key_low,
        key_high=args.key_high,
        despill=args.despill,
    )
