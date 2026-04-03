#!/usr/bin/env python3
"""
Generate map data JSON from businessInfoLA.csv.
Two groups:
- Michelin restaurants (michelin=1) → inRW=1
- Non-Michelin restaurants (michelin=0) → treated250=1
"""

import csv
import json

def main():
    businesses = []

    with open('/home/bassam/Downloads/michelin_2025_files/businessInfoLA.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            lat = row['latitude']
            lon = row['longitude']
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

    print(f"Michelin: {michelin_count}")
    print(f"Non-Michelin: {non_michelin_count}")
    print(f"Total: {len(businesses)}")

    output_path = 'data/michelin_la.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(businesses, f, indent=2)
    print(f"\nCreated {output_path}")

if __name__ == '__main__':
    main()
