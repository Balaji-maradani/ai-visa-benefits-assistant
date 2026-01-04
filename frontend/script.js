// Static demo data
const mockBenefits = [
    {
        id: "food_cashback",
        title: "Food Cashback",
        description: "5% cashback up to ₹200/month on food delivery",
        icon: "🍕",
        details: "Get 5% cashback on Swiggy, Zomato, Uber Eats. Maximum ₹200 per month.",
        terms: "Valid on food orders only. Cashback credited within 30 days."
    },
    {
        id: "movie_offer",
        title: "Movie Offer", 
        description: "Buy 1 Get 1 free movie tickets (weekends)",
        icon: "🎬",
        details: "Free movie tickets on weekends at PVR, INOX, Cinepolis. Maximum 4 free tickets per month.",
        terms: "Valid on weekends only. Subject to availability."
    },
    {
        id: "airport_lounge",
        title: "Airport Lounge Access",
        description: "1 complimentary lounge visit per quarter", 
        icon: "✈️",
        details: "Free access to domestic airport lounges. 1 visit every 3 months.",
        terms: "Domestic airports only. Card holder only. Subject to availability."
    }
];

const recommendedBenefit = {
    ...mockBenefits[0],
    reason: "As a student in Chennai, food delivery cashback is perfect for you! You probably order food frequently during study sessions. This 5% cashback can save you ₹50-100 monthly, which adds up for a student budget."
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Enable button
    const analyzeBtn = document.getElementById('analyze-btn');
    analyzeBtn.disabled = false;
    
    // Add click handler
    analyzeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showResults();
    });
    
    // Setup card number formatting
    const cardInput = document.getElementById('card-number');
    if (cardInput) {
        cardInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            
            // Limit to 16 digits
            if (value.length > 16) {
                value = value.substring(0, 16);
            }
            
            // Format with hyphens after every 4 digits
            let formatted = value.replace(/(\d{4})(?=\d)/g, '$1-');
            
            e.target.value = formatted;
            
            // Update card display
            updateCardDisplay(value);
        });
    }
});

function updateCardDisplay(cardNumber) {
    const cardDisplay = document.getElementById('card-display');
    if (!cardDisplay) return;
    
    let displayNumber = '';
    
    if (cardNumber.length === 0) {
        displayNumber = '****-****-****-****';
    } else if (cardNumber.length <= 16) {
        // Show first 4 digits, mask middle, show last 4 if available
        const padded = cardNumber.padEnd(16, '*');
        
        if (cardNumber.length <= 4) {
            displayNumber = padded.replace(/(\d{4})(\*{4})(\*{4})(\*{4})/, '$1-$2-$3-$4');
        } else if (cardNumber.length <= 12) {
            // Mask middle digits, show what's entered
            const masked = cardNumber.substring(0, 4) + 
                          '*'.repeat(8) + 
                          cardNumber.substring(4);
            displayNumber = masked.padEnd(16, '*').replace(/(\w{4})(\w{4})(\w{4})(\w{4})/, '$1-$2-$3-$4');
        } else {
            // Show first 4, mask middle 8, show last 4
            const first4 = cardNumber.substring(0, 4);
            const last4 = cardNumber.substring(12);
            displayNumber = `${first4}-****-****-${last4}`;
        }
    }
    
    cardDisplay.textContent = displayNumber;
}

function showResults() {
    // Show all benefits
    displayAllBenefits();
    
    // Show recommended benefit
    displayRecommendedBenefit();
    
    // Results section is already visible in HTML
}

function displayAllBenefits() {
    const container = document.getElementById('all-benefits');
    container.innerHTML = '';
    
    mockBenefits.forEach(benefit => {
        const benefitCard = document.createElement('div');
        benefitCard.style.cssText = `
            background: white;
            border: 2px solid #e1e5e9;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
            cursor: pointer;
        `;
        
        benefitCard.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                <span style="font-size: 24px;">${benefit.icon}</span>
                <h4 style="color: #1a1f71; margin: 0;">${benefit.title}</h4>
            </div>
            <p style="color: #666; margin-bottom: 10px;">${benefit.description}</p>
            <p style="font-size: 14px; color: #888;">${benefit.details}</p>
            <div style="background: #fff3cd; padding: 8px; border-radius: 5px; margin-top: 10px; font-size: 12px;">
                🚨 DEMO DATA ONLY
            </div>
        `;
        
        container.appendChild(benefitCard);
    });
}

function displayRecommendedBenefit() {
    const container = document.getElementById('recommended-benefit');
    
    container.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
            <span style="font-size: 32px;">${recommendedBenefit.icon}</span>
            <h4 style="color: #1a1f71; margin: 0; font-size: 20px;">${recommendedBenefit.title}</h4>
        </div>
        <p style="color: #666; margin-bottom: 15px; font-size: 16px;">${recommendedBenefit.description}</p>
        <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <strong>💡 Why this is perfect for you:</strong><br>
            ${recommendedBenefit.reason}
        </div>
        <div style="background: #ffebee; padding: 10px; border-radius: 5px; font-size: 12px; text-align: center;">
            🚨 DEMO DATA - Not real benefits
        </div>
    `;
}

// Global functions for footer links
function showPrivacyInfo() {
    alert('Privacy Policy: This is a demo application with mock data only. No real data is processed.');
}

function showTermsInfo() {
    alert('Terms of Use: This is a prototype demonstration. All data is fictional for demo purposes only.');
}

function showContactInfo() {
    alert('Contact: This is a demo application. For real Visa support, contact your bank.');
}