const demoQuestions = {
  neet: {
    physics: [
      {
        question: "Unit of force is?",
        options: ["Newton", "Joule", "Watt", "Pascal"],
        correctAnswer: "Newton",
      },
      {
        question: "Speed of light is approximately?",
        options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10⁴ m/s", "3×10² m/s"],
        correctAnswer: "3×10⁸ m/s",
      },
      {
        question: "Unit of energy is?",
        options: ["Joule", "Newton", "Watt", "Volt"],
        correctAnswer: "Joule",
      },
      {
        question: "Instrument to measure current?",
        options: ["Ammeter", "Voltmeter", "Barometer", "Thermometer"],
        correctAnswer: "Ammeter",
      },
      {
        question: "Acceleration due to gravity on Earth?",
        options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "12 m/s²"],
        correctAnswer: "9.8 m/s²",
      },
    ],

    chemistry: [
      {
        question: "Chemical formula of water?",
        options: ["H₂O", "CO₂", "O₂", "H₂"],
        correctAnswer: "H₂O",
      },
      {
        question: "pH of neutral solution?",
        options: ["7", "5", "9", "1"],
        correctAnswer: "7",
      },
      {
        question: "Atomic number of Oxygen?",
        options: ["8", "6", "12", "10"],
        correctAnswer: "8",
      },
      {
        question: "Gas essential for combustion?",
        options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon"],
        correctAnswer: "Oxygen",
      },
      {
        question: "NaCl is commonly known as?",
        options: ["Salt", "Sugar", "Acid", "Base"],
        correctAnswer: "Salt",
      },
    ],

    biology: [
      {
        question: "Basic unit of life?",
        options: ["Cell", "Tissue", "Organ", "System"],
        correctAnswer: "Cell",
      },
      {
        question: "Powerhouse of the cell?",
        options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"],
        correctAnswer: "Mitochondria",
      },
      {
        question: "Blood group universal donor?",
        options: ["O-", "AB+", "A+", "B-"],
        correctAnswer: "O-",
      },
      {
        question: "Photosynthesis occurs in?",
        options: ["Chloroplast", "Mitochondria", "Nucleus", "Cytoplasm"],
        correctAnswer: "Chloroplast",
      },
      {
        question: "Largest organ in human body?",
        options: ["Skin", "Heart", "Brain", "Liver"],
        correctAnswer: "Skin",
      },
    ],
  },

  jee: {
    physics: [
      {
        question: "SI unit of work?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: "Joule",
      },
      {
        question: "Unit of power?",
        options: ["Watt", "Joule", "Newton", "Volt"],
        correctAnswer: "Watt",
      },
      {
        question: "Formula of velocity?",
        options: ["Distance/Time", "Mass×Acceleration", "Force/Area", "Work/Time"],
        correctAnswer: "Distance/Time",
      },
      {
        question: "Unit of pressure?",
        options: ["Pascal", "Newton", "Watt", "Volt"],
        correctAnswer: "Pascal",
      },
      {
        question: "Device to measure voltage?",
        options: ["Voltmeter", "Ammeter", "Barometer", "Thermometer"],
        correctAnswer: "Voltmeter",
      },
    ],

    chemistry: [
      {
        question: "Atomic number of Carbon?",
        options: ["6", "12", "8", "10"],
        correctAnswer: "6",
      },
      {
        question: "Symbol of Gold?",
        options: ["Au", "Ag", "Gd", "Go"],
        correctAnswer: "Au",
      },
      {
        question: "Most abundant gas in atmosphere?",
        options: ["Nitrogen", "Oxygen", "Hydrogen", "Carbon dioxide"],
        correctAnswer: "Nitrogen",
      },
      {
        question: "HCl is an example of?",
        options: ["Acid", "Base", "Salt", "Metal"],
        correctAnswer: "Acid",
      },
      {
        question: "Avogadro number approximately?",
        options: ["6.022×10²³", "3×10⁸", "9.8", "1.6×10⁻¹⁹"],
        correctAnswer: "6.022×10²³",
      },
    ],

    maths: [
      {
        question: "Derivative of x²?",
        options: ["2x", "x", "x²", "1"],
        correctAnswer: "2x",
      },
      {
        question: "Value of π approximately?",
        options: ["3.14", "2.17", "1.61", "4.13"],
        correctAnswer: "3.14",
      },
      {
        question: "Integral of 1 dx?",
        options: ["x + C", "1", "0", "C"],
        correctAnswer: "x + C",
      },
      {
        question: "sin 90°?",
        options: ["1", "0", "-1", "½"],
        correctAnswer: "1",
      },
      {
        question: "2³ equals?",
        options: ["8", "6", "9", "4"],
        correctAnswer: "8",
      },
    ],
  },

  cet: {
    physics: [
      {
        question: "Unit of current?",
        options: ["Ampere", "Volt", "Ohm", "Watt"],
        correctAnswer: "Ampere",
      },
      {
        question: "Unit of resistance?",
        options: ["Ohm", "Volt", "Ampere", "Watt"],
        correctAnswer: "Ohm",
      },
      {
        question: "SI unit of mass?",
        options: ["Kilogram", "Gram", "Newton", "Watt"],
        correctAnswer: "Kilogram",
      },
      {
        question: "Speed formula?",
        options: ["Distance/Time", "Mass×Acceleration", "Work/Time", "Force/Area"],
        correctAnswer: "Distance/Time",
      },
      {
        question: "Unit of temperature?",
        options: ["Kelvin", "Celsius", "Fahrenheit", "Joule"],
        correctAnswer: "Kelvin",
      },
    ],

    chemistry: [
      {
        question: "Chemical symbol of Sodium?",
        options: ["Na", "So", "S", "Sn"],
        correctAnswer: "Na",
      },
      {
        question: "Symbol of Iron?",
        options: ["Fe", "Ir", "In", "F"],
        correctAnswer: "Fe",
      },
      {
        question: "CO₂ is?",
        options: ["Carbon dioxide", "Oxygen", "Hydrogen", "Nitrogen"],
        correctAnswer: "Carbon dioxide",
      },
      {
        question: "pH less than 7 means?",
        options: ["Acidic", "Basic", "Neutral", "Salt"],
        correctAnswer: "Acidic",
      },
      {
        question: "Water freezes at?",
        options: ["0°C", "100°C", "50°C", "10°C"],
        correctAnswer: "0°C",
      },
    ],

    biology: [
      {
        question: "Plant food preparation?",
        options: ["Photosynthesis", "Respiration", "Transpiration", "Digestion"],
        correctAnswer: "Photosynthesis",
      },
      {
        question: "Human heart has how many chambers?",
        options: ["4", "2", "3", "5"],
        correctAnswer: "4",
      },
      {
        question: "Largest bone in body?",
        options: ["Femur", "Tibia", "Humerus", "Skull"],
        correctAnswer: "Femur",
      },
      {
        question: "Blood is pumped by?",
        options: ["Heart", "Lungs", "Kidney", "Brain"],
        correctAnswer: "Heart",
      },
      {
        question: "Vitamin C prevents?",
        options: ["Scurvy", "Rickets", "Night blindness", "Anemia"],
        correctAnswer: "Scurvy",
      },
    ],

    mathematics: [
      {
        question: "2 + 2?",
        options: ["4", "3", "5", "6"],
        correctAnswer: "4",
      },
      {
        question: "5 × 6?",
        options: ["30", "25", "35", "20"],
        correctAnswer: "30",
      },
      {
        question: "Square of 9?",
        options: ["81", "72", "99", "18"],
        correctAnswer: "81",
      },
      {
        question: "√16?",
        options: ["4", "3", "5", "6"],
        correctAnswer: "4",
      },
      {
        question: "10 ÷ 2?",
        options: ["5", "2", "8", "4"],
        correctAnswer: "5",
      },
    ],
  },
};

export default demoQuestions;
