document.addEventListener('DOMContentLoaded', function() {
  emailjs.init('N4oS5bMB6QxfPFsu2'); // Replace with your Public Key from EmailJS

  const form = document.getElementById('bmi-form');
  const resultContainer = document.getElementById('result-container');
  const bmiResult = document.getElementById('bmi-result');
  const bmiCategory = document.getElementById('bmi-category');
  const emailBtn = document.getElementById('email-btn');
  const modal = document.getElementById('emailModal');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.getElementById('closeModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (height > 0 && weight > 0) {
      const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
      let category = '';

      if (bmi < 18.5) {
        category = 'Underweight';
      } else if (bmi < 24.9) {
        category = 'Normal weight';
      } else if (bmi < 29.9) {
        category = 'Overweight';
      } else {
        category = 'Obesity';
      }

      bmiResult.textContent = bmi;
      bmiCategory.textContent = category;
      resultContainer.classList.remove('hidden');

      emailBtn.onclick = function() {
        emailjs.send('service_5q5eu2s', 'template_47gr61c', {
          to_name: name,
          to_email: email,
          bmi: bmi,
          category: category,
        }).then(function(response) {
          modalBody.textContent = 'Email sent successfully!';
          modal.style.display = 'flex';
        }, function(error) {
          modalBody.textContent = 'There was an error sending the email. Please try again.';
          modal.style.display = 'flex';
        });
      };
    }
  });

  closeModal.onclick = function() {
    modal.style.display = 'none';
  };

  closeModalBtn.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
});
