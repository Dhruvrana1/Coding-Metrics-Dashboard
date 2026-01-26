document.addEventListener("DOMContentLoaded",function(){
    const searchButton = document.getElementById("search_btn");
    const userInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");

    const easyProgress = document.querySelector(".easy-progress");
    const mediumProgress = document.querySelector(".medium-progress");
    const hardProgress = document.querySelector(".hard-progress");

    const easyLabel = document.getElementById("Easy")
    const mediumLabel = document.getElementById("medium")
    const hardLabel = document.getElementById("hard")

    const statsCard = document.querySelector(".stats-cards")

    function validateUsername(username){
        if(username.trim()==""){
            alert("Username should not be empty")
            return false;
        }
        const regex = /^[a-zA-Z0-9]{3,15}$/;
        const Ismatching = regex.test(username);
        if(!Ismatching){
            alert("Enter valid username")
        }
        return Ismatching;
    }   


    async function fetchUserdetails(username) {
        const url = `https://leetcode-api-faisalshohag.vercel.app/${username}`
        try{
            searchButton.textContent = "Searching..";
            searchButton.disabled = true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to find user details");
                
            }

            const data = await response.json();
            console.log("logging data: ",data);
            DisplayUserdata(data);
        }
        catch(error){
            statsContainer.innerHTML = `<p> No data found</p>`
        }
        finally{
            searchButton.textContent = "Search"
            searchButton.disabled = false
        }
    }

    function Updateprogress(solved, total, label, circle){
        const progressDegree = (solved/total)*100
        circle.style.setProperty("--progress-degree",`${progressDegree}%`)
        label.textContent = `${solved}/${total}`;
    }

    function DisplayUserdata(data){
        const totalQuestions = data.totalSubmissions[0].count;
        const EasyQuestions = data.totalSubmissions[1].count;
        const MediumQuestions = data.totalSubmissions[2].count;
        const HardQuestions = data.totalSubmissions[3].count;
        
        const SolvedQuestion = data.matchedUserStats.acSubmissionNum[0].count;
        const SolvedEasyQuestion = data.matchedUserStats.acSubmissionNum[1].count;
        const SolvedMediumQuestion = data.matchedUserStats.acSubmissionNum[2].count;
        const SolvedHardQuestion = data.matchedUserStats.acSubmissionNum[3].count;

        Updateprogress(SolvedEasyQuestion,EasyQuestions,easyLabel,easyProgress)
        Updateprogress(SolvedMediumQuestion,MediumQuestions,mediumLabel,mediumProgress)
        Updateprogress(SolvedHardQuestion,HardQuestions,hardLabel,hardProgress)
        
    }


    searchButton.addEventListener("click",function(){
        const username = userInput.value;
        console.log("Login username: ",username);
        if(validateUsername(username)){
            fetchUserdetails(username);
        }
    })
})