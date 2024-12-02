// document.getElementById("header").innerHTML = document.querySelector("header").innerHTML;
// document.getElementById("footer").innerHTML = document.querySelector("footer").innerHTML;


$(document).ready(function() {
    const resumeid = $('#resume').attr('resumeid');
    const initialData = $('#resume').html();

    // Function to save resume data to local storage
    $('#saveResume').on('click', function() {
        const resumeData = $('#resume').html();
        localStorage.setItem(resumeid, resumeData);
        $('#successMessage').text('Resume saved!').fadeIn().delay(5000).fadeOut();
        // alert('Resume saved!');
    });

    // Function to clear resume data from local storage and reload the div
    $('#clearResume').on('click', function() {
        localStorage.removeItem(resumeid);
        $('#resume').html(initialData);
        $('#successMessage').text('Resume data cleared and reset!').fadeIn().delay(5000).fadeOut();
        // alert('Resume data cleared and reset!');
    });

    // Function to copy resume data as Base64
    $('#copyResume').on('click', function() {
        const resumeData = $('#resume').html();
        const base64Data = btoa(unescape(encodeURIComponent(resumeData)));
        navigator.clipboard.writeText(base64Data).then(() => {
            $('#successMessage').text('copied').fadeIn().delay(5000).fadeOut();
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
            $('#successMessage').text('Resume data pasted from clipboard!').fadeIn().delay(5000).fadeOut();
            // alert('Resume data pasted from clipboard!');
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
        adjustFontSize();
    }
});
