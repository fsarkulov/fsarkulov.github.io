
//Here is the API connection that will connect the form to the sheet 
const scriptURL = 'https://script.google.com/macros/s/AKfycbzWPNwU98O8yK_U2fVHj9oJa7jGm6URcmikxNAcsOrIcRNW4q98RQFc8WuDQ-yXzlox/exec' ;

const form = document.forms['regForm'];

  
form.addEventListener('reset', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => window.location.href = "mainpage.html")
            
  });

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => window.location.href = "thankyou_page.html")
            
  });
   

      
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length-1)) {
    document.getElementById("nextBtn").style.display = "none"
    document.getElementById("prevBtn").style.display = "none"  
  } 
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}



function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}




function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

//Create re-direct function for impact measures if they click button to continue with form
function redir(){
    window.location.href = "mainpage.html";

    form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))     
  });    
}

//if they are done filling out measures, then they click button and form is submitted    
function send(){
    window.location.href = "thankyou_page.html"
}    
//Creating Cascading Drop Down List, gives options conditioned on the organization
    var subObj = {
        
       "AIDS Foundation":
           {"Getting to Zero Illinois": ["PReP Usage", "Number of Virally Suppressed Patients", "Number of New HIV Cases"],
           "Connection to Care learning Collaborative": ["Number of Patients Screened for HIV","Number of New HIV Cases", "Number of Patients Identified as Vulnerable to HIV", "Number of Patients who Receive PReP Counseling and Education", "Number of Patients who Receive PReP Prescription","Number of HIV Patients Receiving Primary Care at Particitpating Health Center","Number of Patients who Begin ARV Therapy at Participating Health Center", "Number of HIV Patients on ARV Therapy who Achieve Viral Suppression within Six Months at Participating Health Center"]}
       ,
        
         "Alliance Chicago": 
            {"Illinois Contraceptive Access Now (ICAN) Phase 2": ["Number of New Individuals Receiving Contraceptive Care", "Number of High Quality Visits"]}
         ,
        "Brave Space Alliance": 
            {"Lucy Hicks Anderson Housing Program": ["Number of Individuals Receiving Hotel Vouchers", "Number of Individuals Receiving Other Housing Referrals", "Number of Visitors to Drop-In Center", "Number of HIV Tests Provided", "Number of PReP Referrals", "Number of New HIV Diagnoses", "% of People with Indication of PReP classified as having been prescribed PReP","% of HIV Diagnosed People who are Virally Suppressed","% of People Linked to HIV Care 1 Month after Diagnosis"]}
        ,
        "Chicago Community Foundation": 
            {"Defenders for All Coalition":["Number of Padilla Consultations","Number of People Represented in Deportation Proceedings"]}
        ,
        
        "Cook County Health Federation" :{"Cook County Housing Coordination & Evaluation Project" :["Number of Behavioral Health Hospitalizations", "Number of Patients Placed in Housing"]},
    
        "Corporation for Supportive Housing" :{"Admistrating and Evaluating the Chicago and Cook County Flexible Housing Pool":["Number of People Served","Number of People Housed", "Number of Emergency Service Utilization Days"]},
    
        "Defy Ventures": {"CEO of Your New Life Re-Entry Training Program at Logan Correctional Facility": ["Number of Individuals Served", "Recidivism Rates"]},

        "Erie Family Health Center" :{"Community Based Behavioral Management":["Number of Behavioral Health Patients Served", "Number of Erie Behavioral Health Visits"]},
        
        "Esperanza Health Centers" :{"Southwest Side Comprehensive HIV Services Program":["Number of New HIV Cases (Latinos)", "Number of PReP Users", "Number of ARV Individuals", "Number of Individuals Screened"]} ,
        
        "Georgetown University" : {"Protecting and Strengthening Healthcare Coverage for Children and Families":["Number of Uninsured Children in Illinois","Number of Medicaid ELIGIBLE Students that are NOT ENROLLED (CPS)","Medicaid Dollars Captured by the Benefits Enrollment Team","Number of Staff on the Benefits Enrollment Team"]},
        
        "Heartland Alliance for Human Needs & Human Rights" : {"Protect Our Care Illinois/Advancing Justice Through Impact Litigation":["Number of Individuals Served", "Enrollment in Healthcare/Public Benefits", "Number of People Housed"]},
        
        "Heartland Alliance Health" : {"Integrated Model of Care for Young Adults Experiencing Homelessness":["Number of Patients Served", "Number of Patients Connected to Housing"]},
        
        "Howard Brown Health" : {"Building Capacity to Serve as a Reproductive Health and Contraceptive Hub":["Number of New Individuals Receiving Contraceptive Care", "Number of High Quality Visits"]},
        
        "Inner City Muslim Action Network" : {"IMAN ER Diversion Project":["Number of Individuals Served", "Number of Behavioral Health Visits"]},
        
        "Law Office of the Cook County Public Defender" :{"Law Office of the Cook County Public Defender Immigration Unit":["Number of Cases Assessed","Case Outcomes","Number of Cases WITH Representation", "Number of Cases WITHOUT Representation","Number of Deportations out of Chicago Immigration Court"]},
        
        "Metropolis (ILJP)" : {"Re-entry Pilot Project" : ["Number of Clients Housed", "Number of Clients Referred","Recidvism Rate"]},
        
        "Northwestern University" : {"The Children and Family Justice Center's Immigration Law Project" : ["Number of New Matters Opened", "Number Social Services/Referrals Provided to Clients", "Number of Bond Hearings", "Number of Bond Screenings"] , 
        "LARC Initiative" : ["Number of IUD Placements","Number of Contraceptive Counseling Consultations"]},
        
        "Safer Foundation"  : {"Cook County Offender Re-entry Program (CCORP)" : ["Number of Women Served", "Number of Early Releases", "Number of Women Housed","Number of Units/Beds Created", "Number of Healthcare/Public Benefits Enrollees"],
        "Women's Justice Institute": ["Number of Women Served","Number of Early Releases", "Number of Women Housed", "Number of Units/Beds Created", "Recidivism Rate (%)"]}, 
        
        "Women in Need Recovery" : {"WIN Decarceration Project": ["Number of Residents Housed", "Number of Individuals Served", "Number of Housing Units/Beds Created", "Enrollment in Healthcare/Public Benefits"]}
        
    }
    
    function displayQ(answer){
        
        document.getElementById(answer + 'Q').style.display = "block";
        if (answer == "yes"){
            document.getElementById('yesQ').style.display = "inline";
            document.getElementById('geoprompt').style.display = "none";
            
        } else if(answer == "no"){
            document.getElementById('yesQ').style.display = "none";        }
    }
    
   function dispGen(ans){
       document.getElementById(ans+'1').style.display = "block";
       if (ans == "ye"){
           document.getElementById('ye1').style.display = "inline";
           document.getElementById('genprompt').style.display = "none";
           
       }
       else if(ans == "ne"){
           document.getElementById('ye1').style.display= "none";
       }
   }

    function dispRac(an){
        document.getElementById(an+'2').style.display = "block";
        if (an == "yee"){
           document.getElementById('yee2').style.display = "inline";
           document.getElementById('racprompt').style.display = "none";

        }
       else if(an == "nee"){
           document.getElementById('yee2').style.display= "none";
       }
    }


    window.onload = function(){
        
        var orgSel = document.getElementById("org-name");
        var projSel = document.getElementById("project");
        var impSel = document.getElementById("impmeasure");
        
        for (var x in subObj){
            orgSel.options[orgSel.options.length] = new Option(x,x);
        }
        
       orgSel.onchange = function(){
            projSel.length = 1;
            impSel.length = 1;
            //var y = subObj[this.value];
            for (var y in subObj[this.value]){
                projSel.options[projSel.options.length] = new Option(y,y)
            }
           }
        
        
       projSel.onchange = function(){
           impSel.length = 1;
           var z = subObj[orgSel.value][this.value];
           for(var i =0; i<z.length;i++){
               impSel.options[impSel.options.length] = new Option(z[i],z[i]);
           }
       }
        projSel.onchange();
       }
    
