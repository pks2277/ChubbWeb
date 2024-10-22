// Validate email
function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const form = document.getElementById('contactForm') as HTMLFormElement;
const statusMessage = document.getElementById('statusMessage') as HTMLParagraphElement;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contactNumber = (document.getElementById('contactNumber') as HTMLInputElement).value;
    const subject = (document.getElementById('subject') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    // Form validation
    if (!name || !email || !contactNumber || !subject || !message) {
        statusMessage.textContent = 'All fields are required!';
        statusMessage.style.color = "red";  // Ensure it's red for failure messages
        statusMessage.style.display = 'block'; // Make sure the message is shown
        return;
    }

    if (!validateEmail(email)) {
        statusMessage.textContent = 'Invalid email format!';
        statusMessage.style.color = "red";
        statusMessage.style.display = 'block'; 
        return;
    }

    try {
        const apiUrl = 'https://6717faf8b910c6a6e02ac448.mockapi.io/Contacts';

        // POST request
        const response = await axios.post(apiUrl, {
            name,
            email,
            contactNumber,
            subject,
            message,
        });

        if (response.status === 201) {
            statusMessage.textContent = 'Form Submitted Successfully';
            statusMessage.style.color = "green";  // Set to green for success messages
            statusMessage.style.display = 'block'; // Show the message

            // Reset the form after successful submission
            form.reset();
        } else {
            statusMessage.textContent = 'Submission Failed, please try again later';
            statusMessage.style.color = "red";
            statusMessage.style.display = 'block'; 
        }
    } catch (error) {
        console.error('Error Occur During Submission:', error);
        statusMessage.textContent = 'Submission Failed!';
        statusMessage.style.color = "red";
        statusMessage.style.display = 'block'; 
    }
});
