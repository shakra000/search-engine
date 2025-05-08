document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const mainContainer = document.querySelector('.main-container');
    const resultPage = document.getElementById('result-page');
    
    // Enhanced Arabic quotes about success with different colors
    const arabicQuotes = [
        { text: "النجاح ليس أن لا يكون لديك إخفاقات، النجاح هو أن تتعلم منها", color: "#00ffff" },
        { text: "لا تنتظر الظروف المثالية، ابدأ حيث أنت واستخدم ما لديك", color: "#ff00ff" },
        { text: "النجاح هو مجموع الجهود الصغيرة التي تتكرر يومياً", color: "#ffff00" },
        { text: "لا يوجد مصعد للنجاح، عليك أن تستخدم الدرج خطوة بخطوة", color: "#00ff00" },
        { text: "النجاح هو الانتقال من فشل إلى فشل دون فقدان الحماس", color: "#00bfff" }
    ];
    
    searchBtn.addEventListener('click', processSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') processSearch();
    });
    
    function processSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        // Clear previous results
        resultPage.innerHTML = '';
        resultPage.className = 'result-page';
        
        if (searchTerm === 'shakra') {
            showHackerTheme();
        } else if (searchTerm) {
            showQuoteResult();
        } else {
            // If search is empty, show error animation
            searchInput.style.animation = 'shake 0.5s';
            searchInput.style.border = '1px solid #ff0000';
            setTimeout(() => {
                searchInput.style.animation = '';
                searchInput.style.border = '';
            }, 500);
            return;
        }
        
        // Hide main container and show result page
        mainContainer.style.opacity = '0';
        setTimeout(() => {
            mainContainer.style.display = 'none';
            resultPage.classList.add('active');
        }, 500);
    }
    
    function showQuoteResult() {
        const randomIndex = Math.floor(Math.random() * arabicQuotes.length);
        const quote = arabicQuotes[randomIndex];
        
        // Create quote element
        const quoteElement = document.createElement('div');
        quoteElement.className = 'quote';
        quoteElement.textContent = quote.text;
        quoteElement.style.color = quote.color;
        quoteElement.style.fontSize = '2.5rem';
        quoteElement.style.fontFamily = "'Almarai', sans-serif";
        quoteElement.style.maxWidth = '800px';
        quoteElement.style.lineHeight = '1.5';
        quoteElement.style.opacity = '0';
        quoteElement.style.animation = 'fadeIn 1.5s forwards';
        
        resultPage.appendChild(quoteElement);
        
        // Create back button
        createBackButton();
    }
    
    function showHackerTheme() {
        resultPage.classList.add('hacker-theme');
        
        // Create binary rain effect
        const binaryRain = document.createElement('div');
        binaryRain.className = 'binary-rain';
        binaryRain.id = 'binary-rain';
        resultPage.appendChild(binaryRain);
        
        // Create hacker text
        const hackerText = document.createElement('div');
        hackerText.className = 'hacker-text';
        hackerText.textContent = 'انت معرض دائما للاختراق لا وجود للامان في عالمنا';
        
        // Animate hacker text letter by letter
        animateText(hackerText, 50, () => {
            // After text animation completes, show the name
            const hackerName = document.createElement('div');
            hackerName.className = 'hacker-name';
            hackerName.textContent = 'Shakra';
            resultPage.appendChild(hackerName);
            
            // Add glitch effect to name
            setInterval(() => {
                hackerName.style.textShadow = `0 0 10px #0f0, 0 0 20px #0f0, ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #0f0`;
            }, 100);
        });
        
        resultPage.appendChild(hackerText);
        
        // Create back button
        createBackButton();
        
        // Start binary rain animation
        startBinaryRain();
    }
    
    function animateText(element, speed, callback) {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else if (callback) {
                callback();
            }
        }
        
        typeWriter();
    }
    
    function createBackButton() {
        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn';
        backBtn.textContent = 'Back to Search';
        backBtn.addEventListener('click', function() {
            resultPage.classList.remove('active');
            setTimeout(() => {
                mainContainer.style.display = 'flex';
                setTimeout(() => {
                    mainContainer.style.opacity = '1';
                    searchInput.value = '';
                    searchInput.focus();
                }, 50);
            }, 500);
        });
        resultPage.appendChild(backBtn);
    }
    
    function startBinaryRain() {
        const binaryRain = document.getElementById('binary-rain');
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Clear previous binary rain
        binaryRain.innerHTML = '';
        
        // Create columns of binary rain
        for (let i = 0; i < 100; i++) {
            const column = document.createElement('div');
            column.className = 'binary-column';
            column.style.left = `${Math.random() * width}px`;
            column.style.top = '-100px';
            column.style.fontSize = `${Math.random() * 10 + 10}px`;
            column.style.opacity = Math.random() * 0.5 + 0.1;
            column.style.animationDuration = `${Math.random() * 5 + 5}s`;
            
            // Create binary characters
            let binaryString = '';
            const length = Math.floor(Math.random() * 15 + 10);
            for (let j = 0; j < length; j++) {
                binaryString += Math.random() > 0.5 ? '1' : '0';
                binaryString += '\n';
            }
            column.textContent = binaryString;
            
            binaryRain.appendChild(column);
        }
    }
    
    // Focus search input on page load
    searchInput.focus();
});