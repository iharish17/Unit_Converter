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
            ],
            time: [
                { name: "Second", value: "s", factor: 1 },
                { name: "Minute", value: "min", factor: 60 },
                { name: "Hour", value: "hr", factor: 3600 },
                { name: "Day", value: "day", factor: 86400 },
                { name: "Week", value: "wk", factor: 604800 },
                { name: "Month (30d)", value: "mo", factor: 2592000 },
                { name: "Year", value: "yr", factor: 31536000 }
            ],
            area: [
                { name: "Square Meter", value: "sqm", factor: 1 },
                { name: "Square Kilometer", value: "sqkm", factor: 1000000 },
                { name: "Square Centimeter", value: "sqcm", factor: 0.0001 },
                { name: "Square Millimeter", value: "sqmm", factor: 0.000001 },
                { name: "Hectare", value: "ha", factor: 10000 },
                { name: "Acre", value: "ac", factor: 4046.86 }
            ],
            currency: [
                { name: "USD", value: "usd", factor: 1 },
                { name: "INR", value: "inr", factor: 83 },
                { name: "EUR", value: "eur", factor: 0.93 },
                { name: "GBP", value: "gbp", factor: 0.8 }
            ],
            mass: [
                { name: "Tonne", value: "t", factor: 1000 },
                { name: "Kilogram", value: "kg", factor: 1 },
                { name: "Gram", value: "g", factor: 0.001 },
                { name: "Milligram", value: "mg", factor: 0.000001 }
            ],
            data: [
                { name: "Bit", value: "b", factor: 1 },
                { name: "Byte", value: "B", factor: 8 },
                { name: "Kilobyte", value: "KB", factor: 8 * 1024 },
                { name: "Megabyte", value: "MB", factor: 8 * 1024 * 1024 },
                { name: "Gigabyte", value: "GB", factor: 8 * 1024 * 1024 * 1024 },
                { name: "Terabyte", value: "TB", factor: 8 * 1024 * 1024 * 1024 * 1024 }
            ],
            volume: [
                { name: "Cubic Meter", value: "cum", factor: 1 },
                { name: "Liter", value: "l", factor: 0.001 },
                { name: "Milliliter", value: "ml", factor: 0.000001 },
                { name: "Cubic Centimeter", value: "cc", factor: 0.000001 },
                { name: "Cubic Inch", value: "cuin", factor: 0.0000163871 },
                { name: "Cubic Foot", value: "cuft", factor: 0.0283168 },
                { name: "Gallon (US)", value: "galus", factor: 0.00378541 }
            ],
            numeral: [
                { name: "Decimal", value: "dec" },
                { name: "Binary", value: "bin" },
                { name: "Octal", value: "oct" },
                { name: "Hexadecimal", value: "hex" }
            ],
            speed: [
                { name: "Meter/Second", value: "mps", factor: 1 },
                { name: "Kilometer/Hour", value: "kmph", factor: 0.277778 },
                { name: "Mile/Hour", value: "mph", factor: 0.44704 },
                { name: "Foot/Second", value: "fps", factor: 0.3048 }
            ],
            gst: [
                { name: "Add GST", value: "add" },
                { name: "Remove GST", value: "remove" }
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

        function convertNumeral(val, from, to) {
            let num;
            if (from === "dec") num = parseInt(val);
            else if (from === "bin") num = parseInt(val, 2);
            else if (from === "oct") num = parseInt(val, 8);
            else if (from === "hex") num = parseInt(val, 16);
            if (isNaN(num)) return "Invalid input";
            let resultVal;
            if (to === "dec") resultVal = num.toString(10);
            else if (to === "bin") resultVal = num.toString(2);
            else if (to === "oct") resultVal = num.toString(8);
            else if (to === "hex") resultVal = num.toString(16).toUpperCase();
            return resultVal;
        }

        function convertGST(val, from, to) {
            const rate = 18;
            if (from === "add" && to === "add")
                return (val + val * rate / 100).toFixed(2);
            if (from === "remove" && to === "remove")
                return (val / (1 + rate / 100)).toFixed(2);
            if (from !== to) return "Choose both action as Add or Remove!";
            return val;
        }

        function convertUnit() {
            const category = document.getElementById('category').value;
            let val = parseFloat(document.getElementById('inputValue').value);
            const from = document.getElementById('fromUnit').value;
            const to = document.getElementById('toUnit').value;
            let res = '';
            if (category === 'numeral') {
                let inp = document.getElementById('inputValue').value;
                if (inp === "") { document.getElementById('result').textContent = ""; return; }
                let ans = convertNumeral(inp, from, to);
                res = inp + ' (' + units[category].find(u => u.value === from).name + ') = ' + ans + ' (' + units[category].find(u => u.value === to).name + ')';
            } else if (category === 'gst') {
                if (isNaN(val)) { document.getElementById('result').textContent = ""; return; }
                let gstResult = convertGST(val, from, to);
                res = from === "add"
                    ? "GST Inclusive Price: " + gstResult
                    : "Base Price Excl. GST: " + gstResult;
            } else {
                if (isNaN(val)) { document.getElementById('result').textContent = ""; return; }
                if (category === 'length' || category === 'weight' || category === 'time' || category === 'area' || category === 'mass' || category === 'data' || category === 'volume' || category === 'speed') {
                    const fromObj = units[category].find(u => u.value === from);
                    const toObj = units[category].find(u => u.value === to);
                    if (!fromObj || !toObj) return;
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
                } else if (category === 'currency') {
                    const fromObj = units[category].find(u => u.value === from);
                    const toObj = units[category].find(u => u.value === to);
                    const base = val / fromObj.factor;
                    const final = base * toObj.factor;
                    res = val + " " + fromObj.name + " = " + final.toLocaleString(undefined, { maximumSignificantDigits: 8 }) + " " + toObj.name;
                }
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
