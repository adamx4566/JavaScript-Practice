  let calculation = localStorage.getItem('calculation') || '';
      showCalculation();
      function updateCalculation(value) {
        calculation += value;
        console.log(calculation);
        showCalculation();
        localStorage.setItem('calculation', calculation);
      }
      function showCalculation() {
        const liczby = document.querySelector('.js-typing');
        liczby.innerHTML = calculation;
      }
      
