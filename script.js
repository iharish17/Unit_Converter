 const units = {
      length: [
        { name: "Meter", value: "m", factor: 1 },
        { name: "Kilometer", value: "km", factor: 1000 },
        { name: "Centimeter", value: "cm", factor: 0.01 },
        { name: "Millimeter", value: "mm", factor: 0.001 },
        { name: "Mile", value: "mi", factor: 1609.34 },
        { name: "Yard", value: "yd", factor: 0.9144 },
        { name: "Foot", value: "ft", factor: 0.3048 },
        { name: "Inch", value: "in", factor: 0.0254 }
      ],
      weight: [
        { name: "Kilogram", value: "kg", factor: 1 },
        { name: "Gram", value: "g", factor: 0.001 },
        { name: "Milligram", value: "mg", factor: 0.000001 },
        { name: "Pound", value: "lb", factor: 0.453592 },
        { name: "Ounce", value: "oz", factor: 0.0283495 }
      ],
      temperature: [
        { name: "Celsius", value: "c" },
        { name: "Fahrenheit", value: "f" },
        { name: "Kelvin", value: "k" }
      ]
    };
    function populateUnitOptions(category) {
      const from = document.getElementById('fromUnit');
      const to = document.getElementById('toUnit');
      from.innerHTML = '';
      to.innerHTML = '';
      units[category].forEach(unit => {
        let opt1 = document.createElement('option');
        opt1.value = unit.value;
        opt1.textContent = unit.name;
        from.appendChild(opt1);
        let opt2 = document.createElement('option');
        opt2.value = unit.value;
        opt2.textContent = unit.name;
        to.appendChild(opt2);
      });
      from.selectedIndex = 0;
      to.selectedIndex = 1;
    }
    function convertUnit() {
      const category = document.getElementById('category').value;
      let val = parseFloat(document.getElementById('inputValue').value);
      const from = document.getElementById('fromUnit').value;
      const to = document.getElementById('toUnit').value;
      let res = '';
      if (isNaN(val)) {
        document.getElementById('result').textContent = '';
        return;
      }
      if (category === 'length' || category === 'weight') {
        const fromObj = units[category].find(u => u.value === from);
        const toObj = units[category].find(u => u.value === to);
        if (!fromObj || !toObj) return;
        // Convert to base (meter or kg), then to target
        const base = val * fromObj.factor;
        const final = base / toObj.factor;
        res = val + ' ' + fromObj.name + ' = ' + final.toLocaleString(undefined, { maximumSignificantDigits: 8 }) + ' ' + toObj.name;
      } else if (category === 'temperature') {
        let tempInCelsius;
        if (from === 'c') tempInCelsius = val;
        else if (from === 'f') tempInCelsius = (val - 32) * 5 / 9;
        else if (from === 'k') tempInCelsius = val - 273.15;
        let resultVal = 0;
        if (to === 'c') resultVal = tempInCelsius;
        else if (to === 'f') resultVal = tempInCelsius * 9 / 5 + 32;
        else if (to === 'k') resultVal = tempInCelsius + 273.15;
        res = val + ' ' + units[category].find(u => u.value === from).name + ' = ' + resultVal.toLocaleString(undefined, { maximumSignificantDigits: 8 }) + ' ' + units[category].find(u => u.value === to).name;
      }
      document.getElementById('result').textContent = res;
    }
    document.getElementById('category').addEventListener('change', function () {
      populateUnitOptions(this.value);
      convertUnit();
    });
    document.getElementById('inputValue').addEventListener('input', convertUnit);
    document.getElementById('fromUnit').addEventListener('change', convertUnit);
    document.getElementById('toUnit').addEventListener('change', convertUnit);
    window.onload = () => {
      populateUnitOptions('length');
      convertUnit();
    };
