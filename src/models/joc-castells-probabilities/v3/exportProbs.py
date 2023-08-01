from calculateProbs import CASTELLS

# Export dictionary to JSON
def exportToJSON():
    import json
    with open('probabilitats_castells.json', 'w') as fp:
        json.dump(CASTELLS, fp, indent=4)

if __name__ == "__main__":
    exportToJSON()