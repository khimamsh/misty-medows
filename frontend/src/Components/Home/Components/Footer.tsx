import { Typography } from "@mui/material";

const Footer: React.FC = () => {
    return (
      <footer style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center', position: 'fixed', bottom: '0', left: '0', width: '100%', }}>
        <Typography variant="body2" color="textSecondary">
          Made with  &#x2665; By Himamsh Kilubatla
        </Typography>
      </footer>
    );
  };
  export default Footer;