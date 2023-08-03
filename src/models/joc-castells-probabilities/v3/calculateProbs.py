import copy

RESULTS = [
    "DESCARREGAT",
    "CARREGAT",
    "INTENT",
    "INTENT DESMUNTAT"
]

# Define the multipliers
EASY_MULTIPLIERS = {
    RESULTS[0]: [1.1, 0.95, 0.9, 0.9],
    RESULTS[1]: [1.05, 1.1, 0.9, 0.9],
    RESULTS[2]: [0.95, 0.95, 0.8, 1.1],
    RESULTS[3]: [1, 1, 1.05, 0.8],
}

MEDIUM_MULTIPLIERS = {
    RESULTS[0]: [1.1, 0.85, 0.85, 0.85],
    RESULTS[1]: [1.05, 1.1, 0.95, 0.95],
    RESULTS[2]: [0.95, 0.95, 0.85, 1.1],
    RESULTS[3]: [1, 1, 1.05, 0.85],
}

HARD_MULTIPLIERS = {
    RESULTS[0]: [1.1, 0.9, 0.9, 0.9],
    RESULTS[1]: [1.05, 1.1, 0.95, 0.95],
    RESULTS[2]: [0.95, 0.95, 0.85, 1.1],
    RESULTS[3]: [1, 1, 1.05, 0.85],
}

IMPOSSIBLE_MULTIPLIERS = {
    RESULTS[0]: [1.1, 0.95, 0.95, 0.95],
    RESULTS[1]: [1.05, 1.1, 0.95, 0.95],
    RESULTS[2]: [0.95, 0.95, 0.95, 1.05],
    RESULTS[3]: [1, 1, 1.05, 0.95],
}

# Define the caps
DEFAULT_LOWER_CAP = 0.02
DEFAULT_UPPER_CAP = 0.96

CASTELLS = {
    # PILARS
    "Pd3": {
        "pes_dependencies": 0,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0.3, 0.4, 0.1, 0.2],
        "dependencies": {},
    },
    "Pd3s": {
        "pes_dependencies": 0.6,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0.1, 0.8, 0.1],
        "dependencies": {
            "Pd3": 1
        }
    },
    "Pd3n": {
        "pes_dependencies": 0.15,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0.1, 0.8, 0.1],
        "dependencies": {
            "Pd3": 1
        }
    },
    "Pd4": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "Pd3n": 0.8,
            "Pd3": 0.2
        }
    },
    "Pd4s": {
        "pes_dependencies": 0.6,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "Pd3n": 0.8,
            "Pd3s": 0.2
        }
    },
    "Pd4n": {
        "pes_dependencies": 0.3,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "Pd3n": 1,
        }
    },
    "Pd5": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Pd4n": 0.8,
            "Pd4": 0.2
        }
    },
    "Pd5s": {
        "pes_dependencies": 0.4,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Pd4n": 0.8,
            "Pd4s": 0.2
        }
    },
    "Pd5n": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.8],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Pd4n": 1,
        }
    },
    "Pd6sf": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.8],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Pd5n": 0.95,
            "Pd5": 0.05
        }
    },
    "FT Pd6f": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Pd5": 1
        }
    },
    "Pd6f": {
        "pes_dependencies": 0.3,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "FT Pd6f": 1
        }
    },
    "MT Pd7fm": {
        "pes_dependencies": 0.9,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "FT Pd6f": 1,
        }
    },
    "FT Pd7fm": {
        "pes_dependencies": 0.7,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "Pd6f": 0.8,
            "MT Pd7fm": 0.2
        }
    },
    "Pd7fm": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.8],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "FT Pd7fm": 1
        }
    },
    "PT Pd8fmp": {
        "pes_dependencies": 0.7,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "MT Pd7fm": 1
        }
    },
    "MT Pd8fmp": {
        "pes_dependencies": 0.7,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "FT Pd7fm": 0.8,
            "PT Pd8fmp": 0.2
        }
    },
    "FT Pd8fmp": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "Pd7fm": 0.8,
            "MT Pd8fmp": 0.2
        }
    },
    "Pd8fmp": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.6],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "FT Pd8fmp": 0.7,
            "MT Pd8fmp": 0.2,
            "PT Pd8fmp": 0.1
        }
    },

    # Torres
    "Td4n": {
        "pes_dependencies": 0,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0.1, 0.2, 0.4, 0.3],
        "dependencies": {}
    },
    "Td5": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Td4n": 1
        }
    },
    "Td5s": {
        "pes_dependencies": 0.4,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "Td4n": 0.7,
            "Td5": 0.3
        }
    },
    "Td5n": {
        "pes_dependencies": 0.6,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "Td4n": 1
        }
    },
    "Td6": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "Td5n": 0.8,
            "Td5": 0.2
        }
    },
    "Td6s": {
        "pes_dependencies": 0.3,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "Td5n": 0.7,
            "Td6": 0.3,
        }
    },
    "Td6n": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "Td5n": 1
        }
    },
    "Td7sf": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "Td6n": 0.9,
            "Td6": 0.1
        }
    },
    "FT Td7f": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "Td6": 1
        }
    },
    "Td7f": {
        "pes_dependencies": 0.4,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "FT Td7f": 1
        }
    },
    "MT Td8fm": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "FT Td7f": 1
        }
    },
    "FT Td8fm": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "Td7f": 0.6,
            "MT Td8fm": 0.4
        }
    },
    "Td8fm": {
        "pes_dependencies": 0.3,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.7],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "FT Td8fm": 1
        }
    },
    "3d4n": {
        "pes_dependencies": 0,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0.2, 0.2, 0.3, 0.3],
        "dependencies": {}
    },
    "3d5": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d4n": 1
        }
    },
    "3d5s": {
        "pes_dependencies": 0.4,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "3d4n": 0.7,
            "3d5": 0.3
        }
    },
    "3d5n": {
        "pes_dependencies": 0.6,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "3d4n": 1
        }
    },
    "3d6": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d5n": 0.8,
            "3d5": 0.2
        }
    },
    "3d6s": {
        "pes_dependencies": 0.3,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "3d5n": 0.7,
            "3d6": 0.3,
        }
    },
    "3d6n": {
        "pes_dependencies": 0.4,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "3d5n": 1
        }
    },
    "3d7": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d6n": 0.8,
            "3d6": 0.2
        }
    },
    "3d7s": {
        "pes_dependencies": 0.3,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 1, 0],
        "dependencies": {
            "3d6n": 0.7,
            "3d6s": 0.3
        }
    },
    "3d7n": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 1, 0],
        "dependencies": {
            "3d6n": 1
        }
    },
    "3d8sf": {
        "pes_dependencies": 0.6,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.7],
        "unique": [0, 0, 1, 0],
        "dependencies": {
            "3d7n": 1,
        }
    },
    "FT 3d8f": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d7": 1
        }
    },
    "3d8f": {
        "pes_dependencies": 0.2,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "FT 3d8f": 1
        }
    },
    "MT 3d9fm": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "FT 3d8f": 1
        }
    },
    "FT 3d9fm": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d8f": 0.8,
            "MT 3d9fm": 0.2
        }
    },
    "3d9fm": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.6],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "FT 3d9fm": 1
        }
    },
    "3d5a": {
        "pes_dependencies": 0.7,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d5": 0.6,
            "Pd3": 0.4
        }
    },
    "3d6a": {
        "pes_dependencies": 0.7,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d6": 0.6,
            "Pd4": 0.4
        }
    },
    "3d7a": {
        "pes_dependencies": 0.7,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d7": 0.6,
            "Pd5": 0.4
        }
    },
    "FT 3d8fa": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d7a": 1
        }
    },
    "3d8fa": {
        "pes_dependencies": 0.5,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "3d8f": 0.6,
            "FT 3d8fa": 0.4,
        }
    },
    "4d4n": {
        "pes_dependencies": 0,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0.2, 0.2, 0.3, 0.3],
        "dependencies": {}
    },
    "4d5": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "4d4n": 1
        }
    },
    "4d5n": {
        "pes_dependencies": 0.6,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "4d4n": 1
        }
    },
    "4d6": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "4d5n": 0.8,
            "4d5": 0.2
        }
    },
    "4d6n": {
        "pes_dependencies": 0.4,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "4d5n": 1
        }
    },
    "4d7": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "4d6n": 0.8,
            "4d6": 0.2
        }
    },
    "4d7n": {
        "pes_dependencies": 0.3,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 1, 0],
        "dependencies": {
            "4d6n": 1
        }
    },
    "4d8": {
        "pes_dependencies": 0.7,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 1, 0],
        "dependencies": {
            "4d7n": 1,
        }
    },
    "FT 4d9f": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "4d8": 1
        }
    },
    "4d9f": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.6],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "FT 4d9f": 1
        }
    },
    "4d5a": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "4d5": 0.6,
            "Pd3": 0.4
        }
    },
    "4d6a": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "4d6": 0.6,
            "Pd4": 0.4
        }
    },
    "4d7a": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "4d7": 0.6,
            "Pd5": 0.4
        }
    },
    "FT 4d8fa": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "4d7a": 1
        }
    },
    "4d8fa": {
        "pes_dependencies": 0.5,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "FT 4d8fa": 1
        }
    },
    "5d4n": {
        "pes_dependencies": 0.5,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0.1, 0.2, 0.4, 0.3],
        "dependencies": {
            "3d4n": 1
        }
    },
    "5d5": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "5d4n": 1,
        }
    },
    "5d5m": {
        "pes_dependencies": 0.9,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "5d5": 1
        }
    },
    "5d5n": {
        "pes_dependencies": 0.6,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "5d4n": 0.7,
            "3d5n": 0.3
        }
    },
    "5d6": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "5d5n": 0.8,
            "5d5": 0.2
        }
    },
    "5d6m": {
        "pes_dependencies": 0.9,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "5d6": 1
        }
    },
    "5d6n": {
        "pes_dependencies": 0.6,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "5d5n": 0.7,
            "3d6n": 0.3
        }
    },
    "5d7": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "5d6n": 0.8,
            "5d6": 0.2
        }
    },
    "FT 5d8f": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "5d7": 1
        }
    },
    "5d8f": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.7],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "FT 5d8f": 1,
        }
    },
    "7d4n": {
        "pes_dependencies": 0.5,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0.1, 0.2, 0.4, 0.3],
        "dependencies": {
            "4d4n": 1
        }
    },
    "7d5": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "7d4n": 1,
        }
    },
    "7d5n": {
        "pes_dependencies": 0.6,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "7d4n": 0.7,
            "4d5n": 0.3
        }
    },
    "7d6": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "7d5n": 0.8,
            "7d5": 0.2
        }
    },
    "7d6n": {
        "pes_dependencies": 0.6,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "7d5n": 0.7,
            "4d6n": 0.3
        }
    },
    "7d7": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "7d6n": 0.8,
            "7d6": 0.2
        }
    },
    "FT 7d8f": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "7d7": 1
        }
    },
    "7d8f": {
        "pes_dependencies": 0.3,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "FT 7d8f": 1,
        }
    },
    "7d8sf": {
        "pes_dependencies": 0.3,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.6],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "4d8": 0.9,
            "7d7": 0.1,
        }
    },
    "9d4n": {
        "pes_dependencies": 0.5,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0.1, 0.2, 0.4, 0.3],
        "dependencies": {
            "3d4n": 1
        }
    },
    "9d5": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "9d4n": 1,
        }
    },
    "9d5n": {
        "pes_dependencies": 0.6,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "9d4n": 0.7,
            "3d5n": 0.3
        }
    },
    "9d6": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "9d5n": 0.8,
            "9d5": 0.2
        }
    },
    "9d6n": {
        "pes_dependencies": 0.4,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "9d5n": 0.7,
            "3d6n": 0.3
        }
    },
    "9d7": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "9d6n": 0.8,
            "9d6": 0.2
        }
    },
    "10d5n": {
        "pes_dependencies": 0.6,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "4d5n": 1
        }
    },
    "10d6": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "10d5n": 1
        }
    },
    "10d6n": {
        "pes_dependencies": 0.6,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "10d5n": 0.7,
            "4d6n": 0.3
        }
    },
    "10d7": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "10d6n": 0.8,
            "10d6": 0.2
        }
    },
}

CLONE_CASTELLS = copy.deepcopy(CASTELLS)