---
layout: base
title: "My print page"
permalink: /resume14.html
---
<div class="container mt-5">
    <h2>Stylish DevOps Resume - v2</h2>
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
        <button class="btn btn-primary" onclick="window.print()"><i class="fas fa-print me-2"></i> Print Resume</button>
        <button class="btn btn-primary btn-icon" id="saveResume"><i class="fas fa-save"></i> Save</button>
        <button class="btn btn-danger btn-icon" id="clearResume"><i class="fas fa-trash-alt"></i> Reset/Clear</button>
        <button class="btn btn-info btn-icon" id="copyResume"><i class="fas fa-copy"></i> Copy Data</button>
        <button class="btn btn-warning btn-icon" id="pasteResume"><i class="fas fa-clipboard"></i> Paste Data</button>
        <span id="successMessage" class="success-msg text-center">Successfull!</span>
    </div>
</div>

