
    // COURSES DATA

    const courses = {

      diploma: {

        "CIS": {
          fee: 5000,
          duration: "3 Months",
          installmentMonths: 5,
          discount: 0
        },

        "DCA": {
          fee: 7000,
          duration: "6 Months",
          installmentMonths: 5,
          discount: 5
        },

        "DWPGD": {
          fee: 10000,
          duration: "6 Months",
          installmentMonths: 5,
          discount: 10
        },

        "DACP  ": {
          fee: 10000,
          duration: "6 Months",
          installmentMonths: 5,
          discount: 10
        },

        "PGDCA": {
          fee: 15000,
          duration: "1 Year",
          installmentMonths: 9,
          discount: 10
        },
        "ADCA": {
          fee: 15000,
          duration: "1 Year",
          installmentMonths: 9,
          discount: 10
        },
        "PGDCA 2.0": {
          fee: 27000,
          duration: "1 Year",
          installmentMonths: 8,
          discount: 10
        },
        "MDCA": {
          fee: 24000,
          duration: "1 Year",
          installmentMonths: 9,
          discount: 10
        }

      },

      hardware: {

        "CDST": {
          fee: 7000,
          duration: "3 Months",
          installmentMonths: 5,
          discount: 0
        },

        "DHT": {
          fee: 10000,
          duration: "6 Months",
          installmentMonths: 4,
          discount: 10
        },

        "ADHT": {
          fee: 18000,
          duration: "1 Year",
          installmentMonths: 9,
          discount: 10
        }

      },

      professional: {

        "MCA": {
          fee: 25000,
          duration: "12 Months",
          installmentMonths: 10,
          discount: 10
        },

        "Tally Pro": {
          fee: 12000,
          duration: "6 Months",
          installmentMonths: 4,
          discount: 10
        },

        "Graphix Pro": {
          fee: 13000,
          duration: "3 Months",
          installmentMonths: 3,
          discount: 10
        }

      },

      crash: {

        "MS Office": {
            fee: 3000,
            duration: "2 Months",
            installmentMonths: 5,
            discount: 0
        },

        "Python": {
            fee: 5000,
            duration: "3 Months",
            installmentMonths: 5,
            discount: 0
        },
    
        "Core Java": {
            fee: 5000,
            duration: "3 Months",
            installmentMonths: 5,
            discount: 0
        },

        "AutoCAD 2D & 3D": {
            fee: 3500,
            duration: "2 Months",
            installmentMonths: 5,
            discount: 0
        }

      },

      vocational: {

        "ADS": {
          fee: 15000,
          duration: "1 Year",
          installmentMonths: 5,
          discount: 10
        },

        "DID": {
          fee: 10000,
          duration: "6 Months",
          installmentMonths: 9,
          discount: 10
        },

        "DDM": {
          fee: 7000,
          duration: "6 Months",
          installmentMonths: 5,
          discount: 5
        }

      }

    };

    // LOAD COURSES

    function loadCourses() {

      const category =
        document.getElementById("category").value;

      const courseDropdown =
        document.getElementById("course");

      courseDropdown.innerHTML =
        '<option value="">-- Select Course --</option>';

      if (category === "") return;

      for (let courseName in courses[category]) {

        let option = document.createElement("option");

        option.value = courseName;

        option.textContent = courseName;

        courseDropdown.appendChild(option);
      }
    }

    function handlePaymentOptions() {

        const category =
        document.getElementById("category").value;

        const installmentRadio =
        document.querySelector('input[value="installment"]');

        const installmentLabel =
        installmentRadio.parentElement;

        if(category === "crash"){

            document.querySelector('input[value="full"]').checked = true;

            installmentRadio.checked = false;

            installmentRadio.disabled = true;

            installmentLabel.style.opacity = "0.5";

        }

        else{

            installmentRadio.disabled = false;

            installmentLabel.style.opacity = "1";
        }
    }

    // CALCULATE

    function calculateFee() {

      const studentName =
        document.getElementById("studentName").value;

      const qualification =
        document.getElementById("qualification").value;

      const category =
        document.getElementById("category").value;

      const course =
        document.getElementById("course").value;

      const paymentType =
        document.querySelector('input[name="payment"]:checked').value;

      if (category === "" || course === "") {

        alert("Please select category and course");

        return;
      }

      const courseData = courses[category][course];

      const fee = courseData.fee;

      const duration = courseData.duration;

      const discount = courseData.discount;

      document.getElementById("result").style.display = "block";

      document.getElementById("rName").innerText = studentName;

      document.getElementById("rQualification").innerText = qualification;

      document.getElementById("rCourse").innerText = course;

      document.getElementById("rDuration").innerText = duration;

      document.getElementById("rFee").innerText = fee;

      let html = "";

      // FULL PAYMENT

      if (paymentType === "full") {

    let totalDiscount = 0;

    let finalFee = fee;

    if(discount > 0){

            totalDiscount =
            (fee * discount) / 100;

            finalFee =
            fee - totalDiscount;
        }

        html = `

            ${
                discount > 0 ?

                `

                <p>
                    <strong>Max Discount:</strong>
                    ${discount}%
                </p>

                <p>
                    <strong>Additional Director Concession:</strong>
                    3%
                </p>

                <p>
                    <strong>Total Discount Applied:</strong>
                    ₹${totalDiscount}
                </p>

                `

                :

                `

                <p>
                    <strong>Discount:</strong>
                    Not Available On Short-Term / Crash Courses
                </p>

                `
            }

            <p class="final">
                Final Payable Fee: ₹${finalFee}
            </p>

        `;
    }

      // INSTALLMENT

      else {

        const downPayment =
          fee * 0.40;

        const remaining =
          fee - downPayment;

        const installmentMonths =
        courseData.installmentMonths;

        const monthlyInstallment =
        Math.round(remaining / installmentMonths);

        html = `

          <p>
            <strong>Down Payment (40%):</strong>
            ₹${downPayment}
          </p>

          <p>
            <strong>Remaining Balance:</strong>
            ₹${remaining}
          </p>

        <p>
        <strong>Installment Duration:</strong>
        ${installmentMonths} Months
        </p>

        <p>
        <strong>Monthly Installment:</strong>
        ₹${monthlyInstallment}
        </p>

          <p class="final">
            Total Course Fee: ₹${fee}
          </p>

        `;
      }

      document.getElementById("paymentResult").innerHTML = html;

    }