import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("❌ Error in 3D Canvas:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            color: "white",
            background: "black",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h2>⚠️ Oops, something went wrong with 3D rendering.</h2>
          <p>Check your textures or try refreshing.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
