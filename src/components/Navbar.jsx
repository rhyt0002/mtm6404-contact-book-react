const Navbar = ({ setSearch }) => {
    return (
      <nav>
        <h1>Contact Book</h1>
        <input
          type="text"
          placeholder="Search contacts..."
          onChange={e => setSearch(e.target.value)}
        />
      </nav>
    );
  };
  
  export default Navbar;