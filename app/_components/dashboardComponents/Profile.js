"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { useAuth } from "../_context/auth";
import { handleUpdateUserDetails } from "@/app/lib/action";

function Profile() {
  const [auth, setAuth] = useAuth(); // Use auth context for managing user state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    role: 0, // Default role
  });

  // Load initial data into state
  useEffect(() => {
    if (auth && auth.user) {
      setProfile({
        name: auth.user.name || "",
        email: auth.user.email || "",
        mobile: auth.user.mobile || "",
        address: auth.user.address || "",
        role: auth.user.role || 0, // Ensure role is captured
      });
    }
  }, [auth]);

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Save changes to auth state and localStorage
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile) return;
    try {
      const { email } = profile;
      const response = await handleUpdateUserDetails(email, profile);

      if (response.success) {
        // Update auth state
        const updatedAuth = {
          ...auth,
          user: {
            ...profile,
            role: profile.role, // Retain the role
          },
        };
        setAuth(updatedAuth);

        // Save to localStorage
        localStorage.setItem("auth", JSON.stringify(updatedAuth));
      }
    } catch (error) {
      console.error("Error while updating product:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Update Profile</h2>
      <Form onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            disabled
          />
        </Form.Group>

        {/* Mobile */}
        <Form.Group controlId="mobile" className="mb-3">
          <Form.Label>Mobile Number *</Form.Label>
          <Form.Control
            type="tel"
            name="mobile"
            value={profile.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />
        </Form.Group>

        {/* Address */}
        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}

export default Profile;
