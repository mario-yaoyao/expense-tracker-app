import "../styles/footer.scss";

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return <footer>© {getCurrentYear()}. All rights reserved.</footer>;
};

export default Footer;
