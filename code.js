const navButtons = document.querySelectorAll(".nav-button")
const homeDiv = document.querySelector(".about")
const allTab = document.querySelectorAll(".tab")

allTab.forEach(function (tab) { tab.classList.toggle("hidden") })
// allTab[0].classList.toggle("hidden")
navButtons.forEach(function (node) {


    node.addEventListener("click", function (event) {
        // allTab.forEach((tab) => {
        //     console.log(tab.classList.contains("active"))
        //     if (tab.classList.contains("active") === true) {
        //         node.classList.remove("active")

        //     }

        // })

        let targetTab = event.target.id
        allTab.forEach((tab) => {
            if (tab.classList.contains("active") === true) {
                tab.classList.toggle("hidden")
                tab.classList.remove("active")
                
            }

            if (tab.classList.contains(targetTab) === true) {
                tab.classList.toggle("hidden")
                tab.classList.add("active")
                node.classList.add("active")
            } else if (tab.classList.contains(targetTab) === false){
                node.classList.remove("active")
                console.log(node.classList)
            }

        })


    })
})

function toggleHidden(event) {
    allTab.forEach((tab) => {
        if (tab.classList.contains(event.target.id) === true) {
            tab.style.display = "block"
        }
    })

}

// document.getElementById("about").addEventListener("click", toggleHidden)
// document.getElementById("projects").addEventListener("click", toggleHidden)
// document.getElementById("contact").addEventListener("click", toggleHidden)
// document.getElementById("resume").addEventListener("click", toggleHidden)
// document.getElementById("resume").addEventListener("click", openPDF)

function openPDF() {
    window.open("Brian D. Jones Resume Aug. 2021 (1).pdf")
}