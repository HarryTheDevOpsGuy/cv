// document.getElementById("header").innerHTML = document.querySelector("header").innerHTML;
// document.getElementById("footer").innerHTML = document.querySelector("footer").innerHTML;
$(document).ready(function() {
    // const resumeid = $('#resume').attr('resumeid');
    const resumeid = 'selectedResume';
    const initialData = $('#resume').html();

    // Function to save resume data to local storage
    $('#saveResume').on('click', function() {
        const resumeData = $('#resume').html();
        localStorage.setItem(resumeid, resumeData);
        alert('Resume saved!');
    });

    // Function to clear resume data from local storage and reload the div
    $('#clearResume').on('click', function() {
        localStorage.removeItem(resumeid);
        $('#resume').html(initialData);
        alert('Resume data cleared and reset!');
        const fontSizeInput = document.getElementById('fontSizeControl');
        adjustFontSize(fontSizeInput.value);
    });

    // Function to copy resume data as Base64
    $('#copyResume').on('click', function() {
        const resumeData = $('#resume').html();
        const base64Data = btoa(unescape(encodeURIComponent(resumeData)));
        navigator.clipboard.writeText(base64Data).then(() => {
            $('#successMessage').fadeIn().delay(5000).fadeOut();
        }).catch(err => {
            alert('Failed to copy resume data: ' + err);
        });
    });

    // Function to paste resume data from clipboard and load it
    $('#pasteResume').on('click', async function() {
        try {
            const text = await navigator.clipboard.readText();
            const resumeData = decodeURIComponent(escape(atob(text)));
            $('#resume').html(resumeData);
            alert('Resume data pasted from clipboard!');
            const fontSizeInput = document.getElementById('fontSizeControl');
            adjustFontSize(fontSizeInput.value);
        } catch (err) {
            alert('Failed to paste resume data from clipboard: ' + err);
        }
    });

    // Function to send resume data to WhatsApp
    $('#sendWhatsApp').on('click', function() {
        const resumeData = $('#resume').html();
        const base64Data = btoa(unescape(encodeURIComponent(resumeData)));
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(base64Data)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Automatically load resume data if available
    const storedData = localStorage.getItem(resumeid);
    if (storedData) {
        $('#resume').html(storedData);
        $('#resume').find('.select-btn').remove();
        const fontSizeInput = document.getElementById('fontSizeControl');
        adjustFontSize(fontSizeInput.value);
    }

    // Update the displayed font size value
    $('#fontSizeControl').on('input', function() {
        $('#fontSizeValue').text(`${this.value}%`);
    });

    // Select resume and edit in new page.
    $('.select-btn').click(function() {
        let resumeData = $(this).closest('.resume-container').html();
        localStorage.setItem(resumeid, resumeData);
        window.location.href = 'edit.html';
    });

});
