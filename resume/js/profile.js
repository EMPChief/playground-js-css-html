/**
 * Profile Module
 * Handles profile picture randomization
 */

function randomizeProfilePictures() {
    // Array of profile picture paths
    const profilePictures = [
        "logo/profile1.jpg",
        "logo/profile2.jpg",
        "logo/profile3.jpg"
    ];
    
    // Helper function to get a random profile picture
    function getRandomProfilePic() {
        const randomIndex = Math.floor(Math.random() * profilePictures.length);
        return profilePictures[randomIndex];
    }
    
    // Get all profile image elements
    const profileImages = document.querySelectorAll('.profile-image');
    
    // For each profile image, set a random image from the array
    profileImages.forEach(img => {
        img.src = getRandomProfilePic();
        
        // Add click event to change the image when clicked
        img.style.cursor = 'pointer';
        
        // Add title attribute for better UX
        img.title = 'Click to change profile picture';
        
        // Add click event listener
        img.addEventListener('click', function() {
            // Add a small animation effect
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'scale(0.8)';
            
            // Set new random image
            setTimeout(() => {
                this.src = getRandomProfilePic();
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}
