window.addEventListener("load", async function(){
    document.getElementById('changing-profile').style.display = "none";
    document.getElementById('changing-plan').style.display = "none";


    document.getElementById('change-profile-btn').addEventListener("click", function(){
        document.getElementById('current-profile').style.display = "none";
        document.getElementById('changing-profile').style.display = "block";
    });
    document.getElementById('save-profile-btn').addEventListener("click", function(){
        document.getElementById('current-profile').style.display = "block";
        document.getElementById('changing-profile').style.display = "none";
    });
    document.getElementById('change-plan-btn').addEventListener("click", function(){
        document.getElementById('current-plan').style.display = "none";
        document.getElementById('changing-plan').style.display = "block";
    });
    document.getElementById('save-plan-btn').addEventListener("click", function(){
        document.getElementById('current-plan').style.display = "block";
        document.getElementById('changing-plan').style.display = "none";
    });
});