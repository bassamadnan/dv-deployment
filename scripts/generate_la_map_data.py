#!/usr/bin/env python3
"""
Generate map data JSON from businessInfoLA.csv.
Two groups:
- Michelin restaurants (michelin=1) → inRW=1
- Non-Michelin restaurants (michelin=0) → treated250=1
"""

import csv
import json

def generate(source_file, lat_col, lon_col, output_path, label):
    businesses = []
    with open(source_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            lat = row[lat_col]
            lon = row[lon_col]
            if not lat or not lon:
                continue
            is_michelin = int(row['michelin']) == 1
            record = {
                'businessID': int(row['businessID']),
                'businessUrl': row['businessUrl'],
                'businessName': row['businessName'],
                'addressLocality': row['addressLocality'],
                'lat': float(lat),
                'long': float(lon),
                'Level1': row['Level1'],
                'Level2': row['Level2'],
                'inRW': 1 if is_michelin else 0,
                'treated250': 0 if is_michelin else 1,
                'control': 0,
            }
            businesses.append(record)

    michelin_count = sum(1 for b in businesses if b['inRW'] == 1)
    non_michelin_count = sum(1 for b in businesses if b['treated250'] == 1)
    print(f"[{label}] Michelin: {michelin_count}, Non-Michelin: {non_michelin_count}, Total: {len(businesses)}")

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(businesses, f, indent=2)
    print(f"Created {output_path}")


def main():
    generate(
        source_file='/home/bassam/Downloads/michelin_2025_files/binfo.csv',
        lat_col='new_latitude',
        lon_col='new_longitude',
        output_path='data/michelin_la_cleaned.json',
        label='Cleaned'
    )
    generate(
        source_file='/home/bassam/Downloads/michelin_2025_files/businessInfoLA.csv',
        lat_col='latitude',
        lon_col='longitude',
        output_path='data/michelin_la_noise.json',
        label='Noise'
    )

if __name__ == '__main__':
    main()
