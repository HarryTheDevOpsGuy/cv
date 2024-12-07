// document.getElementById("header").innerHTML = document.querySelector("header").innerHTML;
// document.getElementById("footer").innerHTML = document.querySelector("footer").innerHTML;


$(document).ready(function() {
    // Create new resume with unique ID
    $('#newResume').click(function() {
        const newResumeId = 'resume-' + Date.now();
        const newResumeContent = '<h3 id="name" class="text-primary">New Resume</h3><p id="title">Your Title Here</p><div class="row"><div class="col-sm-6"><h5>Technical Skills</h5><ul><li>Skill 1</li><li>Skill 2</li><li>Skill 3</li></ul></div><div class="col-sm-6"><h5>Work Experience</h5><p><strong>Your Position</strong> at Company (Year - Year)</p></div></div>';
        $('#resume').attr('data-id', newResumeId).html(newResumeContent);
        highlightActiveResume();
    });

    $('.select-btn').click(function() {
        const rawContent = $(this).closest('.carousel-item').find('.resume-body').clone();
        rawContent.find('.hide-code').remove();
        const resumeContent = rawContent.html();
        const resumeName = $(this).closest('.carousel-item').find('#name').text();
        const resumeId = 'resume-' + Date.now();
        const savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
        const existingIndex = savedResumes.findIndex(resume => resume.id === resumeId);
        if (existingIndex !== -1) {
            savedResumes[existingIndex] = { id: resumeId, name: 'tmpl - ' + resumeName, content: resumeContent };
        } else {
            savedResumes.push({ id: resumeId, name: resumeName, content: resumeContent });
        }

        localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
        window.location.href = 'resume-editor.html';
    });
    

    // Save resume
    $('#saveResume').click(function() {
        const resumeContent = $('#resume').html();
        const resumeName = $('#name').text();
        const resumeTitle = $('#title').text(); || 'cv-builder'
        const resumeId = $('#resume').attr('data-id') || 'resume-' + Date.now();
        const savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
        
        const existingIndex = savedResumes.findIndex(resume => resume.id === resumeId);
        if (existingIndex !== -1) {
            savedResumes[existingIndex] = { id: resumeId, name: resumeName, title: resumeTitle, content: resumeContent };
        } else {
            savedResumes.push({ id: resumeId, name: resumeName, title: resumeTitle, content: resumeContent });
        }

        localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
        loadSavedResumes();
    });

    // Load saved resumes
    function loadSavedResumes() {
        const savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
        const resumesData = document.getElementById("saved-resumes");
        // resumesData.innerHTML = "";
        savedResumes.forEach((resume, index) => {
            divData = `
                <div class="deployed-solution">
                    <i class="fab fa-aws"></i>
                    <h4>${resume.name}</h4>
                    <p>DevOps Engineer</p>
                    <i class="fas fa-edit action-btn" onclick="editResume('${index}')" title="Edit"></i>
                    <i class="fas fa-trash action-btn" onclick="deleteResume('${index}')" title="Delete"></i>
                </div>
            `;
            // resumesData.append(divData);
            $('#saved-resumes').append(divData);
        });
    }

    // Edit resume
    window.editResume = function(index) {
        const savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
        const resume = savedResumes[index];
        $('#resume').attr('data-id', resume.id).html(resume.content);
        highlightActiveResume();
    };

    // Delete resume
    window.deleteResume = function(index) {
        let savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
        savedResumes.splice(index, 1);
        localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
        loadSavedResumes();
    };

    // Copy resume to Base64
    $('#copyResumeBase64').click(function() {
        const resumeContent = $('#resume').html();
        const resumeBase64 = btoa(unescape(encodeURIComponent(resumeContent)));
        navigator.clipboard.writeText(resumeBase64).then(function() {
            $('#successMessage').fadeIn().delay(2000).fadeOut();
        });
    });

    // Paste resume from Base64
    $('#pasteResumeBase64').click(function() {
        navigator.clipboard.readText().then(function(text) {
            const resumeContent = decodeURIComponent(escape(atob(text)));
            $('#resume').html(resumeContent);
            $('#saveResume').click();
        });
    });

    // Highlight active resume
    function highlightActiveResume() {
        const resumeId = $('#resume').attr('data-id');
        $('.resume-item').removeClass('active-resume');
        $(`.resume-item[data-id="${resumeId}"]`).addClass('active-resume');
    }

    // Set font size for all elements under #resume based on percentage
    function setFontSize(fontSizePercentage) {
        $('#resume').find('*').each(function() {
            const originalFontSize = $(this).data('original-font-size');
            if (!originalFontSize) {
                const currentFontSize = parseFloat($(this).css('font-size').replace('px', ''));
                $(this).data('original-font-size', currentFontSize);
            }
            const newFontSize = $(this).data('original-font-size') * (fontSizePercentage / 100);
            $(this).css('font-size', newFontSize + 'px');
        });
    }

    // Manual font size adjustment using scroller
    $('#fontSizeControl').on('input', function() {
        const fontSize = $(this).val();
        setFontSize(fontSize);
        $('#fontSizeValue').text(fontSize + '%');
    });

    // Smooth scrolling for internal links
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000);
        }
    });

    // Initial load of saved resumes
    loadSavedResumes();
});
