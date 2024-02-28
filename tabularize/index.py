import json
import pandas as pd

# Function to flatten entries for the metadata.json
def flatten_metadata(entry):
    return {
        "symbol": entry["_source"].get("symbol", ""),
        "type": entry["_source"].get("type", ""),
        "name": entry["_source"].get("name", ""),
        "exchange": entry["_source"].get("exchange", ""),
        "currency": entry["_source"].get("currency", ""),
        "countryName": entry["_source"].get("countryName", "")
        # Add other fields as needed
    }

# Function to flatten entries for the candle.json
def flatten_candle(entry):
    return {
        "symbol": entry["_source"].get("symbol", ""),
        "dateTime": entry["_source"].get("dateTime", ""),
        "startPrice": entry["_source"].get("startPrice", 0),
        "highestPrice": entry["_source"].get("highestPrice", 0),
        "lowestPrice": entry["_source"].get("lowestPrice", 0),
        "endPrice": entry["_source"].get("endPrice", 0),
        "volume": entry["_source"].get("volume", 0)
    }

# Function to flatten entries for the exchange.json
def flatten_exchange(entry):
    return {
        "symbol": entry["_source"].get("symbol", ""),
        "ticker": entry["_source"].get("ticker", ""),
        "type": entry["_source"].get("type", ""),
        "name": entry["_source"].get("name", ""),
        "currency": entry["_source"].get("currency", ""),
        "country": entry["_source"].get("country", "")
        # Add other fields as needed
    }

# Generic function to load JSON and flatten data
def process_json(file_path, flatten_function):
    with open(file_path, 'r') as file:
        json_data = json.load(file)
        flattened_data = [flatten_function(entry) for entry in json_data["hits"]["hits"]]
        return pd.DataFrame(flattened_data)

# Process each JSON file
metadata_df = process_json("../data/metadata.json", flatten_metadata)
candle_df = process_json("../data/candle.json", flatten_candle)
exchange_df = process_json("../data/exchange.json", flatten_exchange)

# Export to CSV
metadata_df.to_csv("metadata.csv", index=False)
candle_df.to_csv("candle.csv", index=False)
exchange_df.to_csv("exchange.csv", index=False)

print("Data processing complete. CSV files exported.")
