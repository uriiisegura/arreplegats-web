import json

# Load the json data
with open("./src/data/old-joc-castells.json") as file:
    data = json.load(file)

# Transform the list into a dictionary
data_dict = {item["castell"]: item for item in data}

# # Verify the transformation
# print(data_dict)

# Fetch probabilities
with open("./src/models/joc-castells-probabilities/v3/probabilitats_castells.json") as file:
    probs = json.load(file)

# # Verify the probabilities
# print(probs)

# Put probabilities into the dictionary as a new key
for castell in data_dict:
    if castell in probs:
        data_dict[castell]["probabilitats"] = probs[castell]
    else:
        print(f"Castell {castell} not found in probabilities")

    # Remove probabilitatsInicials and probabilitatsLimit keys
    data_dict[castell].pop("probabilitatsInicials", None)
    data_dict[castell].pop("probabilitatsLimit", None)

# Add to the dictionary the keys that are missing
for castell in probs:
    if castell not in data_dict:
        data_dict[castell] = {}
        data_dict[castell]["probabilitats"] = probs[castell]
        data_dict[castell]["castell"] = castell
        data_dict[castell]["neta"] = 1

# Export to JSON
with open("./src/data/joc-castells.json", "w") as file:
    json.dump(data_dict, file, indent=4)