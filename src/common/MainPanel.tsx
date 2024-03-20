import React from 'react';

const MainPanel: React.FC<{ children: any }> = ({children}: any) => {
    return (
        <div className="main-panel">
            {children}
            <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
                <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Premium <a href="#" target="_blank">Bootstrap admin template</a> from BootstrapDash.</span>
                <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Copyright © 2021. All rights reserved.</span>
            </div>
            </footer>
      </div>
    )
}

export default MainPanel;