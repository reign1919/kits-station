
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const audioStation = document.getElementById('audio-station');

        
        fileInput.addEventListener('change', handleFiles);

        
        uploadArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (event) => {
            event.preventDefault();
            uploadArea.classList.remove('dragover');
            handleFiles(event.dataTransfer);
        });

        function handleFiles(event) {
            const files = event.files || event.target.files;
            audioStation.innerHTML = '';

            Array.from(files).forEach(file => {
                if (file.type.startsWith('audio/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const audioDiv = document.createElement('div');
                        audioDiv.className = 'audio-player';
                        audioDiv.innerHTML = `
                            <strong>${file.name}</strong>
                            <audio controls>
                                <source src="${e.target.result}" type="${file.type}">
                                Your browser does not support the audio element.
                            </audio>
                        `;
                        audioStation.appendChild(audioDiv);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
