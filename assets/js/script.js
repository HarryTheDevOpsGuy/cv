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
        rawContent.find('.select-btn').remove();
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
        window.location.href = 'edit.html';
    });
    

    // Save resume
    $('#saveResume').click(function() {
        const resumeContent = $('#resume').html();
        const resumeName = $('#name').text();
        const resumeId = $('#resume').attr('data-id');
        const savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
        
        const existingIndex = savedResumes.findIndex(resume => resume.id === resumeId);
        if (existingIndex !== -1) {
            savedResumes[existingIndex] = { id: resumeId, name: resumeName, content: resumeContent };
        } else {
            savedResumes.push({ id: resumeId, name: resumeName, content: resumeContent });
        }

        localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
        loadSavedResumes();
    });

    // Load saved resumes
    function loadSavedResumes() {
        const savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
        $('#savedResumes').empty();
        savedResumes.forEach((resume, index) => {
            $('#savedResumes').append(`
                <div class="resume-item list-group-item" data-id="${resume.id}">
                    <span>${resume.name}</span>
                    <div class="resume-actions">
                        <button class="btn btn-sm btn-primary" onclick="editResume(${index})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deleteResume(${index})"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `);
        });
        highlightActiveResume();
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

    // // Set font size for all elements under #resume based on percentage
    // function setFontSize(fontSizePercentage) {
    //     $('#resume').find('*').each(function() {
    //         const originalFontSize = $(this).data('original-font-size');
    //         if (!originalFontSize) {
    //             const currentFontSize = parseFloat($(this).css('font-size').replace('px', ''));
    //             $(this).data('original-font-size', currentFontSize);
    //         }
    //         const newFontSize = $(this).data('original-font-size') * (fontSizePercentage / 100);
    //         $(this).css('font-size', newFontSize + 'px');
    //     });
    // }

    // // Manual font size adjustment using scroller
    // $('#fontSizeControl').on('input', function() {
    //     const fontSize = $(this).val();
    //     setFontSize(fontSize);
    //     $('#fontSizeValue').text(fontSize + '%');
    // });



// Function to set font size for all elements under #resume based on percentage
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

// Function to adjust font size to fit within #resume
function adjustFontSizeToFit() {
    const $resume = $('#resume');
    const $elements = $resume.find('*');
    const resumeWidth = $resume.width();
    let fontSizePercentage = 100;

    // Continue reducing font size percentage until text fits within the #resume width
    while ($elements[0].scrollWidth > resumeWidth && fontSizePercentage > 0) {
        fontSizePercentage -= 1;
        setFontSize(fontSizePercentage);
    }
}

// Manual font size adjustment using scroller
$('#fontSizeControl').on('input', function() {
    const fontSize = $(this).val();
    setFontSize(fontSize);
    $('#fontSizeValue').text(fontSize + '%');
    adjustFontSizeToFit();
});

    // Initial load of saved resumes
    loadSavedResumes();
    // adjustFontSizeToFit();
});
