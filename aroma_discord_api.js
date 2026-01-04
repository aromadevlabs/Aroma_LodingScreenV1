// ========================================
// AROMA DEVLABS - ANNOUNCEMENTS SYSTEM
// ========================================

var announcements = [ 
    {
        username: 'Server Owner',
        content: 'content_here',
        timestamp: '2026-01-04T12:00:00Z',
        type: 'event'
    },
    {
        username: 'Developer',
        content: 'content_here',
        timestamp: '2026-01-02T10:00:00Z',
        type: 'update'
    },
    {
        username: 'Server Admin',
        content: 'content_here',
        timestamp: '2025-12-28T15:30:00Z',
        type: 'update'
    },
    {
        username: 'Events Team',
        content: 'content_here',
        timestamp: '2025-12-20T18:00:00Z',
        type: 'event'
    },
    {
        username: 'Lead Developer',
        content: 'content_here',
        timestamp: '2025-12-15T09:00:00Z',
        type: 'update'
    }
];

var discordInviteLink = 'https://discord.gg/yourinvite';

// ========================================
// DISPLAY FUNCTIONS
// ========================================

function displayAnnouncements() {
    var contentDiv = document.getElementById('discordFeedContent');
    
    if (!contentDiv) {
        console.error('[Announcements] Feed content div not found');
        return;
    }
    
    if (!announcements || announcements.length === 0) {
        contentDiv.innerHTML = '<div class="discord-error">' +
            '<div class="discord-error-icon">📭</div>' +
            '<p>No recent announcements</p>' +
            '</div>';
        return;
    }

    var html = '';
    
    for (var i = 0; i < announcements.length; i++) {
        var announcement = announcements[i];
        var timestamp = formatDiscordTimestamp(announcement.timestamp);
        var username = announcement.username;
        var avatar = getAvatarInitial(username);
        var content = sanitizeContent(announcement.content);
        
        html += '<div class="discord-message">' +
            '<div class="discord-message-header">' +
            '<div class="discord-avatar">' + avatar + '</div>' +
            '<span class="discord-username">' + username + '</span>' +
            '<span class="discord-timestamp">' + timestamp + '</span>' +
            '</div>' +
            '<div class="discord-message-content">' + content + '</div>' +
            '</div>';
    }
    
    contentDiv.innerHTML = html;
    console.log('[Announcements] Displayed ' + announcements.length + ' announcements');
}

function formatDiscordTimestamp(timestamp) {
    var date = new Date(timestamp);
    var now = new Date();
    var diffMs = now - date;
    var diffMins = Math.floor(diffMs / 60000);
    var diffHours = Math.floor(diffMs / 3600000);
    var diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return diffMins + 'm ago';
    if (diffHours < 24) return diffHours + 'h ago';
    if (diffDays < 7) return diffDays + 'd ago';
    
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()] + ' ' + date.getDate();
}

function getAvatarInitial(username) {
    return username.charAt(0).toUpperCase();
}

function sanitizeContent(content) {
    if (!content) return 'No content';
    
    if (content.length > 200) {
        content = content.substring(0, 200) + '...';
    }
    
    var div = document.createElement('div');
    div.textContent = content;
    return div.innerHTML;
}

function refreshDiscordFeed() {
    var contentDiv = document.getElementById('discordFeedContent');
    contentDiv.innerHTML = '<div class="discord-loading">' +
        '<div class="discord-spinner"></div>' +
        '<p>Refreshing...</p>' +
        '</div>';
    
    console.log('[Announcements] Refreshing...');
    
    setTimeout(function() {
        displayAnnouncements();
    }, 500);
}

function updateDiscordLink() {
    var joinBtn = document.querySelector('.discord-join-btn');
    if (joinBtn) {
        joinBtn.href = discordInviteLink;
    }
}

// ========================================
// INITIALIZATION
// ========================================

window.addEventListener('load', function() {
    console.log('[Announcements] Initializing announcements system...');
    
    if (document.getElementById('discordFeedContent')) {
        console.log('[Announcements] Feed element found, displaying announcements...');
        displayAnnouncements();
        updateDiscordLink();
        initializeDiscordRefreshButton();
    } else {
        console.warn('[Announcements] Feed element not found in DOM');
    }
});

// Initialize Discord Refresh Button
function initializeDiscordRefreshButton() {
    const refreshBtn = document.getElementById('discordRefreshBtn');
    
    if (refreshBtn) {
        console.log('[Discord] Refresh button found, attaching click handler');
        
        refreshBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('[Discord] Refresh button clicked');
            refreshDiscordFeed();
        });
        
        console.log('[Discord] Refresh button click handler attached');
    } else {
        console.warn('[Discord] Refresh button not found');
    }
}

console.log('[Announcements] Script loaded successfully');

