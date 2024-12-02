---
layout: base
title: "My print page"
permalink: /resume13.html
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editable Resume</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        .btn-icon { margin-right: 10px; }
        .container { background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        .resume-section { margin-bottom: 20px; }
        .resume-section h3 { border-bottom: 2px solid #333; padding-bottom: 5px; }
        #resume h1, #resume h2 { margin-bottom: 10px; }
        #resume p { margin-bottom: 5px; }
        .success-msg { color: green; display: none; }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div id="resume" resumeid="resumeid01" contenteditable="true" class="rounded border p-3">
            <h1 id="name">John Doe</h1>
            <h2 id="title">Software Developer</h2>
            <p><i class="fas fa-envelope"></i> <span id="email">john.doe@example.com</span></p>
            <p><i class="fas fa-phone"></i> <span id="phone">(123) 456-7890</span></p>
            <h3>Experience</h3>
            <div class="resume-section">
                <h4>Senior Developer at Tech Company</h4>
                <p>January 2018 - Present</p>
                <p>Leading a team of developers to build scalable web applications.</p>
            </div>
            <div class="resume-section">
                <h4>Junior Developer at Another Tech Company</h4>
                <p>June 2015 - December 2017</p>
                <p>Worked on multiple projects involving front-end and back-end technologies.</p>
            </div>
            <h3>Education</h3>
            <div class="resume-section">
                <h4>BS in Computer Science</h4>
                <p>University of Somewhere, 2011 - 2015</p>
                <p>Graduated with honors.</p>
            </div>
        </div>
        <div class="mt-3 text-center">
            <button class="btn btn-primary btn-icon" id="saveResume"><i class="fas fa-save"></i> Save</button>
            <button class="btn btn-danger btn-icon" id="clearResume"><i class="fas fa-trash-alt"></i> Reset/Clear</button>
            <button class="btn btn-info btn-icon" id="copyResume"><i class="fas fa-copy"></i> Copy Data</button>
            <button class="btn btn-warning btn-icon" id="pasteResume"><i class="fas fa-clipboard"></i> Paste Data</button>
            <span id="successMessage" class="success-msg text-center">Successfull!</span>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script>
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

            // Automatically load resume data if available
            const storedData = localStorage.getItem(resumeid);
            if (storedData) {
                $('#resume').html(storedData);
            }
        });
    </script>
</body>
</html>
