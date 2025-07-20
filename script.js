document.addEventListener('DOMContentLoaded', () => {
    console.log("Smaya & Nihanth's Colorful World: Page Loaded with All Interactive Elements!");

    // Smooth scroll for navigation (makes clicking nav links nicer)
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Helper function to show/hide game areas
    function toggleGameContent(button, contentId) {
        const content = document.getElementById(contentId);
        if (content) {
            const isVisible = content.style.display === 'block';
            document.querySelectorAll('.hidden-content').forEach(item => {
                item.style.display = 'none'; // Hide all other content areas
            });
            content.style.display = isVisible ? 'none' : 'block'; // Toggle clicked one
            button.textContent = isVisible ? button.dataset.originalText : `Hide ${button.dataset.originalText.replace('Play ', '').replace('Start ', '')}`;
        }
    }

    // Store original button texts for toggling
    document.querySelectorAll('.play-game-button, .play-audio-button, .explore-art-button, .view-collection-button').forEach(button => {
        button.dataset.originalText = button.textContent;
    });

    // Main interaction handler for all "play" buttons
    document.querySelectorAll('.play-game-button, .play-audio-button, .explore-art-button, .view-collection-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const feature = event.target.dataset.feature;
            let contentId = '';
            switch (feature) {
                case 'story-cloud': contentId = 'story-cloud-content'; break;
                case 'dress-up': contentId = 'dress-up-game'; break;
                case 'telugu-sloka': contentId = 'telugu-sloka-content'; playTeluguSloka(); break;
                case 'art-ideas': contentId = 'art-ideas-content'; break;
                case 'kpop-rhythm': contentId = 'kpop-rhythm-content'; break;
                case 'sky-fact': contentId = 'sky-fact-content'; break;
                case 'racing-game': contentId = 'racing-game-area'; initializeRacingGame(); break;
                case 'build-robot': contentId = 'build-robot-game'; initializeBuildRobotGame(); break;
                case 'watch-collection': contentId = 'watch-collection-content'; break;
                case 'pokemon-match': contentId = 'pokemon-matching-game'; initializePokemonMatchGame(); break;
                case 'eat-rainbow': contentId = 'eat-rainbow-game'; initializeEatRainbowGame(); break;
                case 'daily-routine': contentId = 'daily-routine-game'; initializeDailyRoutineGame(); break;
                case 'feeling-friends': contentId = 'feeling-friends-game'; initializeFeelingFriendsGame(); break;
                case 'weather-outfit': contentId = 'weather-outfit-game'; initializeWeatherOutfitGame(); break;
                case 'math-challenge': contentId = 'math-challenge-game'; initializeMathChallengeGame(); break;
                default:
                    alert(`"${button.textContent}" feature is not yet fully implemented, but you're doing great!`);
                    return;
            }
            if (contentId) {
                toggleGameContent(button, contentId);
            }
        });
    });

    // Alphabet Explorer Functionality
    const alphabetGrid = document.getElementById('alphabet-explorer-grid');
    const alphabetMessage = document.querySelector('.alphabet-message');

    if (alphabetGrid) {
        alphabetGrid.addEventListener('click', (event) => {
            const letterCard = event.target.closest('.letter-card');
            if (letterCard) {
                const letter = letterCard.dataset.letter;
                const word = letterCard.dataset.word;

                // Play a generic click sound for all letters (no need for individual audio files)
                // Using a public domain sound from a CDN
                const clickSound = new Audio('https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/context/click.mp3');
                clickSound.play().catch(e => console.error("Error playing sound:", e));

                if (alphabetMessage) {
                    alphabetMessage.textContent = `${letter.toUpperCase()} is for ${word}!`;
                }
            }
        });
    }

    // Story Read Aloud (Telugu Sloka) - using Text-to-Speech API (simulated)
    function playTeluguSloka() {
        // In a real scenario, you'd integrate with a TTS API or use pre-recorded audio files.
        // For this demo, we'll just show an alert and briefly highlight the text.
        const slokaContent = document.getElementById('telugu-sloka-content');
        if (slokaContent) {
            slokaContent.style.display = 'block'; // Ensure content is visible
            alert("Playing Telugu Sloka now! (Text-to-Speech simulation)");
            const teluguText = slokaContent.querySelector('.telugu-text');
            if (teluguText) {
                teluguText.style.backgroundColor = 'yellow';
                setTimeout(() => {
                    teluguText.style.backgroundColor = '';
                }, 3000); // Highlight for 3 seconds
            }
        }
    }


    // --- Game Implementations (Simplified/Simulated) ---

    // 1. Digital Dress-Up Game
    function initializeDressUpGame() {
        const character = document.querySelector('#dress-up-game .dress-up-character');
        const options = document.querySelectorAll('#dress-up-game .dress-up-item');

        // Clear previous items
        character.innerHTML = '';

        options.forEach(item => {
            item.draggable = true;
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.type + ',' + e.target.dataset.color + ',' + e.target.textContent);
            });
        });

        character.addEventListener('dragover', (e) => e.preventDefault());
        character.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain').split(',');
            const type = data[0];
            const color = data[1];
            const text = data[2];

            let existingItem = character.querySelector(`[data-placed-type="${type}"]`);
            if (existingItem) {
                character.removeChild(existingItem);
            }

            const placedItem = document.createElement('div');
            placedItem.dataset.placedType = type;
            placedItem.textContent = text;
            placedItem.style.position = 'absolute';
            placedItem.style.width = '100%';
            placedItem.style.textAlign = 'center';
            placedItem.style.color = 'white';
            placedItem.style.fontWeight = 'bold';
            placedItem.style.padding = '5px 0';

            if (type === 'top') {
                placedItem.style.top = '60px';
                placedItem.style.backgroundColor = color;
                placedItem.style.height = '60px';
                placedItem.style.lineHeight = '60px';
            } else if (type === 'bottom') {
                placedItem.style.top = '120px';
                placedItem.style.backgroundColor = color;
                placedItem.style.height = '60px';
                placedItem.style.lineHeight = '60px';
            } else if (type === 'accessory') {
                placedItem.style.top = (color === 'hat' ? '0px' : '40px'); // hat higher
                placedItem.style.backgroundColor = color === 'hat' ? '#DDA0DD' : '#FFB6C1';
                placedItem.style.width = 'fit-content';
                placedItem.style.padding = '3px 8px';
                placedItem.style.borderRadius = '5px';
                placedItem.style.left = '50%';
                placedItem.style.transform = 'translateX(-50%)';
            }
            character.appendChild(placedItem);
            alert(`Lily is wearing a ${text.toLowerCase()}!`);
        });
    }

    // 2. Super Speed Race!
    function initializeRacingGame() {
        const playerCar = document.getElementById('player-car');
        const aiCar = document.getElementById('ai-car');
        const startButton = document.getElementById('race-start-button');
        const raceStatus = document.getElementById('race-status');

        let playerPosition = 10;
        let aiPosition = 10;
        let raceInterval;

        const trackLength = 400; // Pixels
        const raceSpeed = 50; // Milliseconds per move

        function resetRace() {
            playerPosition = 10;
            aiPosition = 10;
            playerCar.style.left = playerPosition + 'px';
            aiCar.style.left = aiPosition + 'px';
            raceStatus.textContent = 'Click GO to start!';
            startButton.disabled = false;
            if (raceInterval) clearInterval(raceInterval);
        }

        function animateRace() {
            playerPosition += Math.random() * 8 + 2; // Player moves randomly
            aiPosition += Math.random() * 7 + 3; // AI moves randomly, slightly faster
            playerCar.style.left = playerPosition + 'px';
            aiCar.style.left = aiPosition + 'px';

            if (playerPosition >= trackLength || aiPosition >= trackLength) {
                clearInterval(raceInterval);
                startButton.disabled = true;
                if (playerPosition >= trackLength && aiPosition >= trackLength) {
                    raceStatus.textContent = 'It\'s a tie!';
                } else if (playerPosition >= trackLength) {
                    raceStatus.textContent = 'You Win!';
                } else {
                    raceStatus.textContent = 'AI Wins!';
                }
                setTimeout(resetRace, 2000); // Reset after 2 seconds
            }
        }

        resetRace(); // Initial reset

        startButton.onclick = () => {
            resetRace();
            startButton.disabled = true;
            raceStatus.textContent = 'Racing...';
            raceInterval = setInterval(animateRace, raceSpeed);
        };
    }

    // 3. Build Your Own Robot!
    function initializeBuildRobotGame() {
        const robotDisplay = document.querySelector('#build-robot-game .robot-display');
        const robotParts = document.querySelectorAll('#build-robot-game .robot-part');

        robotDisplay.innerHTML = ''; // Clear existing robot

        const placedParts = {}; // To keep track of placed parts

        robotParts.forEach(part => {
            part.draggable = true;
            part.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.part + ',' + e.target.dataset.color);
            });
        });

        robotDisplay.addEventListener('dragover', (e) => e.preventDefault());
        robotDisplay.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain').split(',');
            const type = data[0];
            const color = data[1];

            // Remove existing part of this type
            if (placedParts[type]) {
                robotDisplay.removeChild(placedParts[type]);
            }

            const newPart = document.createElement('div');
            newPart.style.position = 'absolute';
            newPart.style.backgroundColor = color;
            newPart.style.border = '1px solid #333';
            newPart.textContent = type.toUpperCase();
            newPart.style.color = 'white';
            newPart.style.display = 'flex';
            newPart.style.alignItems = 'center';
            newPart.style.justifyContent = 'center';

            if (type === 'head') {
                newPart.style.width = '80px';
                newPart.style.height = '60px';
                newPart.style.borderRadius = '50%';
                newPart.style.top = '10px';
                newPart.style.left = '35px';
            } else if (type === 'body') {
                newPart.style.width = '100px';
                newPart.style.height = '80px';
                newPart.style.top = '70px';
                newPart.style.left = '25px';
            } else if (type === 'legs') {
                newPart.style.width = '80px';
                newPart.style.height = '50px';
                newPart.style.top = '150px';
                newPart.style.left = '35px';
            }
            robotDisplay.appendChild(newPart);
            placedParts[type] = newPart;
            alert(`You added a ${type} to your robot!`);
        });
    }

    // 4. Pokemon Matching Game
    function initializePokemonMatchGame() {
        const gameBoard = document.querySelector('#pokemon-matching-game .memory-grid');
        const matchStatus = document.getElementById('match-status');
        const resetButton = document.getElementById('reset-match-game');

        const pokemons = ['🔥', '💧', '🌿', '⚡', '🧊', '🪨', '👻', '🐉']; // Using emojis for simplicity
        let cards = [...pokemons, ...pokemons]; // Duplicate for matching
        let flippedCards = [];
        let matchedPairs = 0;
        let lockBoard = false; // To prevent rapid clicks

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function createBoard() {
            gameBoard.innerHTML = ''; // Clear board
            matchedPairs = 0;
            matchStatus.textContent = '';
            flippedCards = [];
            lockBoard = false;
            cards = shuffle(cards);

            cards.forEach((pokemon, index) => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('memory-card');
                cardElement.dataset.pokemon = pokemon;
                cardElement.dataset.index = index;

                const cardFront = document.createElement('div');
                cardFront.classList.add('card-front');
                cardFront.textContent = '?'; // Or a generic icon

                const cardBack = document.createElement('div');
                cardBack.classList.add('card-back');
                cardBack.textContent = pokemon;

                cardElement.appendChild(cardFront);
                cardElement.appendChild(cardBack);

                cardElement.addEventListener('click', flipCard);
                gameBoard.appendChild(cardElement);
            });
        }

        function flipCard() {
            if (lockBoard || this === flippedCards[0]) return; // Prevent double click on same card
            this.classList.add('flip');
            this.classList.add('flipped-visible');

            flippedCards.push(this);

            if (flippedCards.length === 2) {
                lockBoard = true;
                checkForMatch();
            }
        }

        function checkForMatch() {
            const [firstCard, secondCard] = flippedCards;
            const isMatch = firstCard.dataset.pokemon === secondCard.dataset.pokemon;

            isMatch ? disableCards() : unflipCards();
        }

        function disableCards() {
            flippedCards.forEach(card => {
                card.removeEventListener('click', flipCard);
                card.classList.add('match', 'matched-visible'); // Add match class
                card.classList.remove('flipped-visible'); // Remove flipped visible color
            });
            matchedPairs++;
            matchStatus.textContent = `Matched! ${matchedPairs} pairs found.`;
            resetFlippedCards();

            if (matchedPairs === pokemons.length) {
                matchStatus.textContent = 'You found all the Pokémon! Great job!';
                alert('Congratulations! You matched all the Pokémon!');
            }
        }

        function unflipCards() {
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.classList.remove('flip', 'flipped-visible');
                });
                resetFlippedCards();
            }, 1000);
        }

        function resetFlippedCards() {
            flippedCards = [];
            lockBoard = false;
        }

        resetButton.addEventListener('click', createBoard);
        createBoard(); // Initial board creation
    }


    // 5. Eat the Rainbow Game
    function initializeEatRainbowGame() {
        const plateArea = document.querySelector('#eat-rainbow-game .plate-area');
        const foodOptions = document.querySelectorAll('#eat-rainbow-game .food-item');
        const checkButton = document.getElementById('check-rainbow');
        const rainbowStatus = document.getElementById('rainbow-status');

        let eatenColors = new Set();
        plateArea.innerHTML = ''; // Clear plate

        foodOptions.forEach(food => {
            food.draggable = true;
            food.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.food);
            });
        });

        plateArea.addEventListener('dragover', (e) => e.preventDefault());
        plateArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const color = e.dataTransfer.getData('text/plain');
            if (!eatenColors.has(color)) {
                eatenColors.add(color);
                const foodOnPlate = document.createElement('div');
                foodOnPlate.classList.add('food-item');
                foodOnPlate.style.backgroundColor = color;
                foodOnPlate.style.borderColor = 'white'; // Make it stand out on plate
                foodOnPlate.textContent = color.charAt(0).toUpperCase(); // Just first letter
                plateArea.appendChild(foodOnPlate);
                rainbowStatus.textContent = `You added ${color}!`;
            } else {
                rainbowStatus.textContent = `You already have ${color} on your plate!`;
            }
        });

        checkButton.onclick = () => {
            if (eatenColors.size >= 6) { // Check if all 6 colors are present
                rainbowStatus.textContent = 'Wow! You ate the whole rainbow! Super healthy!';
                rainbowStatus.style.color = 'var(--success-color)';
            } else {
                rainbowStatus.textContent = `You have ${eatenColors.size} colors. Try to get all 6!`;
                rainbowStatus.style.color = 'var(--error-color)';
            }
            eatenColors.clear(); // Reset for next play
            plateArea.innerHTML = '';
        };
        rainbowStatus.textContent = 'Drag fruits/veggies to the plate!';
        rainbowStatus.style.color = 'var(--text-dark)';
    }

    // 6. My Daily Routine Helper
    function initializeDailyRoutineGame() {
        const routineList = document.querySelector('#daily-routine-game .routine-list');
        const routineDropzone = document.querySelector('#daily-routine-game .routine-dropzone');
        const completeButton = document.getElementById('complete-routine');
        const routineStatus = document.getElementById('routine-status');

        let completedTasks = new Set();
        routineDropzone.innerHTML = 'Drag tasks here!'; // Reset dropzone

        document.querySelectorAll('#daily-routine-game .routine-item').forEach(item => {
            item.draggable = true;
            item.classList.remove('completed'); // Reset visual
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.task);
            });
            // Re-add to initial list if they were moved
            routineList.appendChild(item);
        });

        routineDropzone.addEventListener('dragover', (e) => e.preventDefault());
        routineDropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData('text/plain');
            const draggedItem = document.querySelector(`[data-task="${taskId}"]`);
            if (draggedItem && !completedTasks.has(taskId)) {
                routineDropzone.appendChild(draggedItem);
                if (routineDropzone.textContent === 'Drag tasks here!') {
                    routineDropzone.textContent = ''; // Clear placeholder
                }
                completedTasks.add(taskId);
                routineStatus.textContent = `${draggedItem.textContent} added to your routine!`;
                routineStatus.style.color = 'var(--text-dark)';
            }
        });

        completeButton.onclick = () => {
            if (completedTasks.size === document.querySelectorAll('.routine-item').length) {
                routineStatus.textContent = 'Great job! All tasks completed!';
                routineStatus.style.color = 'var(--success-color)';
                document.querySelectorAll('#daily-routine-game .routine-item').forEach(item => {
                    item.classList.add('completed');
                });
            } else {
                routineStatus.textContent = `Keep going! You have ${document.querySelectorAll('.routine-item').length - completedTasks.size} tasks left!`;
                routineStatus.style.color = 'var(--error-color)';
            }
            completedTasks.clear(); // Reset for next play
            routineDropzone.innerHTML = 'Drag tasks here!';
        };
        routineStatus.textContent = 'Drag your daily tasks!';
        routineStatus.style.color = 'var(--text-dark)';
    }

    // 7. Feeling Friends!
    function initializeFeelingFriendsGame() {
        const emotionDisplayIcon = document.getElementById('current-emotion-icon');
        const emotionDisplayText = document.getElementById('current-emotion-text');
        const emotionButtons = document.querySelectorAll('#feeling-friends-game .emotion-buttons button');

        const emotions = {
            happy: { icon: '😄', text: 'Happy! You might feel excited or joyful.' },
            sad: { icon: '😢', text: 'Sad. It\'s okay to feel sad sometimes. A hug might help!' },
            angry: { icon: '😡', text: 'Angry! It\'s okay to feel mad, but use your words to tell someone.' },
            surprised: { icon: '😮', text: 'Surprised! Something unexpected happened!' }
        };

        function showEmotion(emotionKey) {
            const emotion = emotions[emotionKey];
            emotionDisplayIcon.textContent = emotion.icon;
            emotionDisplayText.textContent = emotion.text;
        }

        emotionButtons.forEach(button => {
            button.onclick = () => showEmotion(button.dataset.emotion);
        });

        showEmotion('happy'); // Default
    }

    // 8. What to Wear Today?
    function initializeWeatherOutfitGame() {
        const weatherSelectorButtons = document.querySelectorAll('#weather-outfit-game .weather-selector button');
        const outfitSuggestion = document.getElementById('outfit-suggestion');
        const outfitCharacter = document.querySelector('#weather-outfit-game .outfit-character');

        const outfits = {
            sunny: { suggestion: 'It\'s sunny! Wear a t-shirt and shorts!', top: '#FFD700', bottom: '#90EE90' },
            rainy: { suggestion: 'It\'s rainy! Grab your raincoat and boots!', top: '#ADD8E6', bottom: '#A9A9A9' },
            cold: { suggestion: 'It\'s cold! Put on a warm jacket and long pants!', top: '#B0C4DE', bottom: '#6A5ACD' }
        };

        function updateOutfit(weather) {
            const outfit = outfits[weather];
            outfitSuggestion.textContent = outfit.suggestion;

            // Clear previous outfit items
            outfitCharacter.innerHTML = '';

            const top = document.createElement('div');
            top.style.position = 'absolute';
            top.style.width = '100%';
            top.style.height = '50%';
            top.style.top = '50px';
            top.style.backgroundColor = outfit.top;
            outfitCharacter.appendChild(top);

            const bottom = document.createElement('div');
            bottom.style.position = 'absolute';
            bottom.style.width = '100%';
            bottom.style.height = '50%';
            bottom.style.top = '100px';
            bottom.style.backgroundColor = outfit.bottom;
            outfitCharacter.appendChild(bottom);
        }

        weatherSelectorButtons.forEach(button => {
            button.onclick = () => updateOutfit(button.dataset.weather);
        });

        updateOutfit('sunny'); // Default
    }

    // 9. Math Challenge!
    let currentQuestion = {};
    function initializeMathChallengeGame() {
        const mathQuestion = document.getElementById('math-question');
        const mathAnswerInput = document.getElementById('math-answer');
        const checkButton = document.getElementById('check-math-answer');
        const mathStatus = document.getElementById('math-status');

        function generateQuestion() {
            const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
            const num2 = Math.floor(Math.random() * 10) + 1;
            const operation = Math.random() < 0.5 ? '+' : '-';
            let questionText = '';
            let correctAnswer;

            if (operation === '+') {
                questionText = `${num1} + ${num2} = ?`;
                correctAnswer = num1 + num2;
            } else {
                // Ensure no negative results for subtraction
                if (num1 < num2) {
                    [num1, num2] = [num2, num1]; // Swap to ensure positive result
                }
                questionText = `${num1} - ${num2} = ?`;
                correctAnswer = num1 - num2;
            }
            currentQuestion = { question: questionText, answer: correctAnswer };
            mathQuestion.textContent = questionText;
            mathAnswerInput.value = '';
            mathStatus.textContent = 'Solve the problem!';
            mathStatus.className = '';
        }

        checkButton.onclick = () => {
            const userAnswer = parseInt(mathAnswerInput.value);
            if (isNaN(userAnswer)) {
                mathStatus.textContent = 'Please enter a number!';
                mathStatus.className = 'status-wrong';
                return;
            }
            if (userAnswer === currentQuestion.answer) {
                mathStatus.textContent = 'Correct! Great job!';
                mathStatus.className = 'status-correct';
                setTimeout(generateQuestion, 1500); // New question after 1.5s
            } else {
                mathStatus.textContent = 'Oops! Try again.';
                mathStatus.className = 'status-wrong';
            }
        };

        // Allow pressing Enter to check answer
        mathAnswerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkButton.click();
            }
        });

        generateQuestion(); // Initial question
    }


    // Optional: A subtle fade-in for sections as they come into view
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of section visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0; // Start invisible
        section.style.transform = 'translateY(20px)'; // Start slightly below
        sectionObserver.observe(section);
    });
});