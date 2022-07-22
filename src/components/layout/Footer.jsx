
function Footer() {
  const footerYear = new Date().getFullYear()
  return (
    <footer className="footer p-10 bg-black text-primary-content ">
      <p>Copyright &copy; {footerYear} All right reserved</p>
    </footer>
  )
}

export default Footer