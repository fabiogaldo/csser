import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#090b10',
        color: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      <header
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid #1d2330',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ fontWeight: 600 }}>
          CSSer <span style={{ opacity: 0.6 }}>— CSS playground</span>
        </div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Backend: Node + Mongo · Frontend: React</div>
      </header>
      <main style={{ flex: 1, display: 'flex', padding: '12px 16px', gap: '12px' }}>{children}</main>
    </div>
  );
}
