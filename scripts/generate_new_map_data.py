#!/usr/bin/env python3
"""
Generate map data JSON files from the new CSV sources.
Creates three datasets from week 1 data:
1. Matched Business Final
2. Matched Zip Final
3. Unmatched Final
"""

import csv
import json

def load_business_info():
    """Load all business information with coordinates."""
    business_info = {}
    with open('data/businessInfo.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            bid = row['businessID']
            lat = row['lat']
            lon = row['long']
            if lat and lon:
                business_info[bid] = {
                    'businessID': int(bid),
                    'businessUrl': row['businessUrl'],
                    'businessName': row['businessName'],
                    'addressLocality': row['addressLocality'],
                    'lat': float(lat),
                    'long': float(lon),
                    'Level1': row['Level1'],
                    'Level2': row['Level2'],
                }
    return business_info

def load_categorization_from_new_file(filepath, week_number=1):
    """
    Load business categorization from new data files.
    Filters to a specific week and deduplicates by businessID.
    Returns sets of businessIDs for each category.
    """
    rw_ids = set()
    neighbor_ids = set()
    control_ids = set()

    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Only process week 1 data
            if int(row['week']) != week_number:
                continue

            bid = row['businessID']

            # Categorize based on flags (priority: inRW > treated250 > control)
            if row['inRW'] == '1':
                rw_ids.add(bid)
            elif row['treated250'] == '1':
                neighbor_ids.add(bid)
            elif row['control'] == '1':
                control_ids.add(bid)

    return rw_ids, neighbor_ids, control_ids

def create_business_record(bid, business_info, category):
    """Create a business record in the format expected by the website."""
    info = business_info[bid]

    # Common fields
    record = {
        'businessID': info['businessID'],
        'businessUrl': info['businessUrl'],
        'businessName': info['businessName'],
        'addressLocality': info['addressLocality'],
        'lat': info['lat'],
        'long': info['long'],
        'Level1': info['Level1'],
        'Level2': info['Level2'],
    }

    # Add category flags
    if category == 'rw':
        record['inRW'] = 1
        record['treated250'] = 0
        record['control'] = 0
    elif category == 'neighbor':
        record['inRW'] = 0
        record['treated250'] = 1
        record['control'] = 0
    elif category == 'control':
        record['inRW'] = 0
        record['treated250'] = 0
        record['control'] = 1

    return record

def main():
    print("Loading business information...")
    business_info = load_business_info()
    print(f"Loaded {len(business_info)} businesses with coordinates")

    # Define the three new data files
    new_files = {
        'matchedBusinessFinal.csv': 'matched_business_final.json',
        'matchedZipFinal.csv': 'matched_zip_final.json',
        'unMatchedFinal.csv': 'unmatched_final.json',
    }

    for input_file, output_file in new_files.items():
        print(f"\n=== Processing {input_file} ===")
        filepath = f'data/new_data/{input_file}'

        # Load categorization from week 1
        rw_ids, neighbor_ids, control_ids = load_categorization_from_new_file(filepath, week_number=1)
        print(f"Week 1 - RW: {len(rw_ids)}, Neighbors: {len(neighbor_ids)}, Control: {len(control_ids)}")

        # Create business records
        rw_businesses = [create_business_record(bid, business_info, 'rw')
                        for bid in rw_ids if bid in business_info]
        neighbor_businesses = [create_business_record(bid, business_info, 'neighbor')
                              for bid in neighbor_ids if bid in business_info]
        control_businesses = [create_business_record(bid, business_info, 'control')
                             for bid in control_ids if bid in business_info]

        print(f"With coordinates: RW={len(rw_businesses)}, Neighbors={len(neighbor_businesses)}, Control={len(control_businesses)}")

        # Combine all businesses
        all_businesses = rw_businesses + neighbor_businesses + control_businesses

        # Write JSON file
        output_path = f'data/{output_file}'
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(all_businesses, f, indent=2)
        print(f"Created {output_path} with {len(all_businesses)} businesses")

    print("\n✓ All new datasets generated successfully!")

if __name__ == '__main__':
    main()
