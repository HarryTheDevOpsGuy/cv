// document.getElementById("header").innerHTML = document.querySelector("header").innerHTML;
// document.getElementById("footer").innerHTML = document.querySelector("footer").innerHTML;
$(document).ready(function() {
    
    function adjustFontSize(fontSize) {
        const resume = document.getElementById('resume');
        resume.style.fontSize = `${fontSize}%`;
        
        const headings = resume.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            heading.style.fontSize = `calc(${fontSize}% + 1em)`;
        });
    }
    
    function saveResume() {
        const resumeContent = document.getElementById('resume').innerHTML;
        const resumeName = document.getElementById('name').textContent.trim() || `Untitled Resume`;
        const resumes = JSON.parse(localStorage.getItem('myresume')) || [];
        const resumeId = document.getElementById('resume').getAttribute('resumeid');
        const resumeIndex = resumes.findIndex(resume => resume.id === resumeId);
    
        if (resumeIndex > -1) {
            resumes[resumeIndex].content = resumeContent;
            resumes[resumeIndex].name = resumeName;
        } else {
            resumes.push({ id: resumeId || `resume${resumes.length + 1}`, name: resumeName, content: resumeContent });
        }
    
        localStorage.setItem('myresume', JSON.stringify(resumes));
        displaySavedResumes();
        // alert('Resume saved successfully!');
    }
    
    function loadResume(resumeId) {
        const resumes = JSON.parse(localStorage.getItem('myresume')) || [];
        const resume = resumes.find(resume => resume.id === resumeId);
        if (resume) {
            document.getElementById('resume').innerHTML = resume.content;
            document.getElementById('resume').setAttribute('resumeid', resume.id);
        }
    }
    
    function clearResume() {
        if (confirm('Are you sure you want to clear the resume?')) {
            document.getElementById('resume').innerHTML = '';
            document.getElementById('resume').removeAttribute('resumeid');
        }
    }
    
    function deleteResume(resumeId) {
        if (confirm('Are you sure you want to delete this resume?')) {
            const resumes = JSON.parse(localStorage.getItem('myresume')) || [];
            const updatedResumes = resumes.filter(resume => resume.id !== resumeId);
            localStorage.setItem('myresume', JSON.stringify(updatedResumes));
            displaySavedResumes();
            clearResume();
        }
    }
    
    function makeDefaultResume(resumeId) {
        const resumes = JSON.parse(localStorage.getItem('myresume')) || [];
        resumes.forEach(resume => resume.isDefault = (resume.id === resumeId));
        localStorage.setItem('myresume', JSON.stringify(resumes));
        displaySavedResumes();
        // alert('Default resume set successfully!');
    }
    
    function copyResumeBase64() {
        const resumeContent = document.getElementById('resume').innerHTML;
        const base64Content = btoa(resumeContent);
        navigator.clipboard.writeText(base64Content).then(() => {
            document.getElementById('successMessage').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 2000);
        });
    }
    
    function pasteResumeBase64() {
        navigator.clipboard.readText().then(text => {
          const decodedContent = atob(text);
          document.getElementById('resume').innerHTML = decodedContent;
          saveResume();
        }).catch(err => {
            alert('Failed to read clipboard contents: ', err);
        });
    }
    
    function sendWhatsApp() {
        const resumeContent = document.getElementById('resume').innerText;
        const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(resumeContent)}`;
        window.open(whatsappURL, '_blank');
    }
    
    function displaySavedResumes() {
        const resumes = JSON.parse(localStorage.getItem('myresume')) || [];
        const savedResumesList = document.getElementById('savedResumes');
        savedResumesList.innerHTML = resumes.map(resume => 
            `<div class="list-group-item resume-item">
                <span onclick="loadResume('${resume.id}')">${resume.name} (${resume.id})</span>
                <div class="resume-actions">
                    <button class="btn btn-info btn-sm" onclick="event.stopPropagation(); loadResume('${resume.id}')"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); loadResume('${resume.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-success btn-sm" onclick="event.stopPropagation(); makeDefaultResume('${resume.id}')"><i class="fas fa-check"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); deleteResume('${resume.id}')"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>`
        ).join('');
    }
    
    function createNewResume() {
        document.getElementById('resume').innerHTML = '<h3 id="name" class="text-primary">New Resume</h3><p>Enter your details here...</p>';
        document.getElementById('resume').removeAttribute('resumeid');
    }
    
    window.addEventListener('DOMContentLoaded', (event) => {
        displaySavedResumes();
    
        const fontSizeInput = document.getElementById('fontSizeControl');
        fontSizeInput.addEventListener('input', (event) => {
            adjustFontSize(event.target.value);
            document.getElementById('fontSizeValue').innerText = `${event.target.value}%`;
        });
    
        document.getElementById('saveResume').addEventListener('click', saveResume);
        document.getElementById('clearResume').addEventListener('click', clearResume);
        document.getElementById('copyResumeBase64').addEventListener('click', copyResumeBase64);
        document.getElementById('pasteResumeBase64').addEventListener('click', pasteResumeBase64);
        document.getElementById('sendWhatsApp').addEventListener('click', sendWhatsApp);
        document.getElementById('newResume').addEventListener('click', createNewResume());
    
        adjustFontSize(fontSizeInput.value);
    });
    

    // Select resume template and edit.
    $('.select-btn').on('click', function() {
        const resumeBody = $(this).closest('.carousel-item').find('.resume-body').html();

        const resumeJson = { id: resumeId || `tmpl${resumes.length + 1}`, name: 'newtmpl', content: resumeBody }
        localStorage.setItem('myresume', resumeJson);
        window.location.href = 'edit.html';
    });
    

});