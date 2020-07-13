import React from 'react';

function Header() {
    return (
        <div class="header">
            <div class="logo">
                <h2 class="logo__title">easysnap</h2>
            </div>

            <div class="header_menu">
                <div class="active">
                    snaps
                </div>
                <div>
                    login
                </div>
                <div>
                    join
                </div>
            </div>
        </div>
    );
}

export default Header;