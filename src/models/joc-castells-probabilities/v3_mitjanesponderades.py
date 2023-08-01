import numpy as np
import random
from os import system
import copy

def histogram(data, max_width=40):
    # extract the first elements
    first_elements = [sub_list[0] for sub_list in data]

    # define the number of bins
    bins = 4

    # create histogram
    histogram = [0]*bins
    for value in first_elements:
        index = int(value * bins)
        if index == bins:  # include 1.0 in the last bin
            index -= 1
        histogram[index] += 1

    # calculate width of each bar
    max_count = max(histogram)
    bar_widths = [int((count / max_count) * max_width) for count in histogram]

    # print histogram
    for i in range(bins):
        lower_limit = i / bins
        upper_limit = (i + 1) / bins
        print(f'{lower_limit:.2f}-{upper_limit:.2f}: {"|" * bar_widths[i]}')

# Define the multipliers
EASY_MULTIPLIERS = {
    "D": [1.2, 0.85, 0.85, 0.8],
    "C": [1.1, 1.1, 0.9, 1.05],
    "I": [0.95, 0.95, 0.8, 1.1],
    "ID": [1, 1, 1.05, 0.8],
}

MEDIUM_MULTIPLIERS = {
    "D": [1.1, 0.85, 0.85, 0.85],
    "C": [1.05, 1.05, 0.95, 1.05],
    "I": [0.95, 0.95, 0.85, 1.1],
    "ID": [1, 1, 1.05, 0.85],
}

HARD_MULTIPLIERS = {
    "D": [1.1, 0.9, 0.9, 0.9],
    "C": [1.05, 1.05, 0.95, 1.05],
    "I": [0.95, 0.95, 0.85, 1.1],
    "ID": [1, 1, 1.05, 0.85],
}

IMPOSSIBLE_MULTIPLIERS = {
    "D": [1.1, 0.95, 0.95, 0.95],
    "C": [1.05, 1.05, 0.95, 1.05],
    "I": [0.95, 0.95, 0.95, 1.05],
    "ID": [1, 1, 1.05, 0.95],
}

# Define the caps
DEFAULT_LOWER_CAP = 0.02
DEFAULT_UPPER_CAP = 0.96

CASTELLS = {
    # PILARS
    "pd3": {
        "pes_dependencies": 0,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0.3, 0.4, 0.1, 0.2],
        "dependencies": {},
    },
    "pd3s": {
        "pes_dependencies": 0.6,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0.1, 0.8, 0.1],
        "dependencies": {
            "pd3": 1
        }
    },
    "pd3n": {
        "pes_dependencies": 0.15,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0.1, 0.8, 0.1],
        "dependencies": {
            "pd3": 1
        }
    },
    "pd4": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "pd3n": 0.8,
            "pd3": 0.2
        }
    },
    "pd4s": {
        "pes_dependencies": 0.6,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "pd3n": 0.8,
            "pd3s": 0.2
        }
    },
    "pd4n": {
        "pes_dependencies": 0.3,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "pd3n": 1,
        }
    },
    "pd5": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd4n": 0.8,
            "pd4": 0.2
        }
    },
    "pd5s": {
        "pes_dependencies": 0.4,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd4n": 0.8,
            "pd4s": 0.2
        }
    },
    "pd5n": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.8],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd4n": 1,
        }
    },
    "pd6sf": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.8],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd5n": 0.95,
            "pd5": 0.05
        }
    },
    "ftpd6f": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "pd5": 1
        }
    },
    "pd6f": {
        "pes_dependencies": 0.3,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "ftpd6f": 1
        }
    },
    "mtpd7fm": {
        "pes_dependencies": 0.9,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "ftpd6f": 1,
        }
    },
    "ftpd7fm": {
        "pes_dependencies": 0.7,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "pd6f": 0.8,
            "mtpd7fm": 0.2
        }
    },
    "pd7fm": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.8],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "ftpd7fm": 1
        }
    },
    "ptpd8fmp": {
        "pes_dependencies": 0.7,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "mtpd7fm": 1
        }
    },
    "mtftpd8fmp": {
        "pes_dependencies": 0.7,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "ftpd7fm": 0.8,
            "ptpd8fmp": 0.2
        }
    },
    "ftpd8fmp": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "pd7fm": 0.8,
            "mtftpd8fmp": 0.2
        }
    },
    "pd8fmp": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.6],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "ftpd8fmp": 0.7,
            "mtftpd8fmp": 0.2,
            "ptpd8fmp": 0.1
        }
    },

    # Torres
    "td4n": {
        "pes_dependencies": 0,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0.1, 0.2, 0.4, 0.3],
        "dependencies": {}
    },
    "td5": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "td4n": 1
        }
    },
    "td5s": {
        "pes_dependencies": 0.4,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "td4n": 0.7,
            "td5": 0.3
        }
    },
    "td5n": {
        "pes_dependencies": 0.6,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "td4n": 1
        }
    },
    "td6": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "td5n": 0.8,
            "td5": 0.2
        }
    },
    "td6s": {
        "pes_dependencies": 0.3,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.8, 0.2],
        "dependencies": {
            "td5n": 0.7,
            "td6": 0.3,
        }
    },
    "td6n": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "td5n": 1
        }
    },
    "td7sf": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.9],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "td6n": 0.9,
            "td6": 0.1
        }
    },
    "fttd7f": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "td6": 1
        }
    },
    "td7f": {
        "pes_dependencies": 0.4,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "fttd7f": 1
        }
    },
    "mttd8fm": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "fttd7f": 1
        }
    },
    "fttd8fm": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.05, 0.95],
        "dependencies": {
            "td7f": 0.6,
            "mttd8fm": 0.4
        }
    },
    "td8fm": {
        "pes_dependencies": 0.3,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.7],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "fttd8fm": 1
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
    "ft3d8f": {
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
            "ft3d8f": 1
        }
    },
    "mt3d9fm": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "ft3d8f": 1
        }
    },
    "ft3d9fm": {
        "pes_dependencies": 0.8,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d8f": 0.8,
            "mt3d9fm": 0.2
        }
    },
    "3d9fm": {
        "pes_dependencies": 0.2,
        "multipliers": IMPOSSIBLE_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, 0.6],
        "unique": [0, 0, 0, 1],
        "dependencies": {
            "ft3d9fm": 1
        }
    },
    "3d5a": {
        "pes_dependencies": 0.7,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d5": 0.6,
            "pd3": 0.4
        }
    },
    "3d6a": {
        "pes_dependencies": 0.7,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d6": 0.6,
            "pd4": 0.4
        }
    },
    "3d7a": {
        "pes_dependencies": 0.7,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "3d7": 0.6,
            "pd5": 0.4
        }
    },
    "ft3d8fa": {
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
            "ft3d8fa": 0.4,
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
    "ft4d9f": {
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
            "ft4d9f": 1
        }
    },
    "4d5a": {
        "pes_dependencies": 0.8,
        "multipliers": EASY_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "4d5": 0.6,
            "pd3": 0.4
        }
    },
    "4d6a": {
        "pes_dependencies": 0.8,
        "multipliers": MEDIUM_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "4d6": 0.6,
            "pd4": 0.4
        }
    },
    "4d7a": {
        "pes_dependencies": 0.8,
        "multipliers": HARD_MULTIPLIERS,
        "caps": [DEFAULT_LOWER_CAP, DEFAULT_UPPER_CAP],
        "unique": [0, 0, 0.2, 0.8],
        "dependencies": {
            "4d7": 0.6,
            "pd5": 0.4
        }
    },
    "ft4d8fa": {
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
            "4d8f": 0.6,
            "ft4d8fa": 0.4,
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
    "ft5d8f": {
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
            "ft5d8f": 1,
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
    "ft7d8f": {
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
            "ft7d8f": 1,
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
    
}

CLONE_CASTELLS = copy.deepcopy(CASTELLS)

def PFinal(castell):
    probs = CASTELLS[castell]
    PD = probs["pes_dependencies"]
    U = probs["unique"]
    D = probs["dependencies"]

    deps = np.array([ k*PFinal(d) for d, k in D.items() ])
    unique = np.array(U)

    if len(deps) == 0:
        return unique
    else:
        return PD*np.sum(deps, axis=0) + (1-PD)*unique

def improve_unique(result, castell):
    npU = np.array(CASTELLS[castell]["unique"])
    multipliers = CASTELLS[castell]["multipliers"]
    [lower_cap, upper_cap] = CASTELLS[castell]["caps"]

    # Cap
    npU = np.clip(npU, lower_cap, upper_cap)

    # Apply multipliers
    if result in multipliers:
        npU *= multipliers[result]

    # Cap
    npU[0] = min(npU[0], upper_cap)
    npU[1] = min(npU[1], upper_cap)
    npU[2] = max(lower_cap, min(npU[2], upper_cap))
    npU[3] = max(lower_cap, min(npU[3], upper_cap))

    # Normalize
    if np.sum(npU) != 0:
        npU /= np.sum(npU)
    else:
        npU = np.array([0, 0, 0, 1])

    # Update probabilities
    CASTELLS[castell]["unique"] = npU.tolist()

    return npU

def simulate_play(castell):
    probs = PFinal(castell)
    result = random.choices(["D", "C", "I", "ID"], probs)[0]
    newProbs = improve_unique(result, castell)
    
    return result, newProbs

# STRATEGY
N_ITERS = 100
COUNTS = {}

STRATEGY = [
    {
        "castell": "4d4n",
        "tries": 20
    },
    {
        "castell": "7d4n",
        "tries": 20
    },
    {
        "castell": "7d5",
        "tries": 20
    },
    {
        "castell": "4d5n",
        "tries": 20
    },
    {
        "castell": "7d5n",
        "tries": 30
    },
    {
        "castell": "7d6",
        "tries": 20
    },
    {
        "castell": "4d6n",
        "tries": 30
    },
    {
        "castell": "7d6n",
        "tries": 40
    },
    {
        "castell": "7d7",
        "tries": 40
    },
    {
        "castell": "ft7d8f",
        "tries": 40
    },
    {
        "castell": "7d8f",
        "tries": 60
    },
]

TRIED_CASTELLS = [
    step["castell"] for step in STRATEGY
]

for j in range(N_ITERS):
    CASTELLS = copy.deepcopy(CLONE_CASTELLS)

    for step in STRATEGY:
        castell = step["castell"]
        tries = step["tries"]

        for i in range(tries):
            result, newProbs = simulate_play(castell)

    # Calculate counts
    for castell in TRIED_CASTELLS:
        if castell not in COUNTS:
            COUNTS[castell] = [np.array(PFinal(castell))]
        else:
            COUNTS[castell] += [np.array(PFinal(castell))]

# HISTOGRAMES
for castell in TRIED_CASTELLS:
    print(castell)
    histogram(COUNTS[castell])