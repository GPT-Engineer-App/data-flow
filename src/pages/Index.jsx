import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backengine-l5hl.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 204) {
        toast({
          title: "Account created.",
          description: "You can now log in with your credentials.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backengine-l5hl.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        toast({
          title: "Logged in.",
          description: "You are now logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to log in");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4}>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <form>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
              Login
            </Button>
            <Button leftIcon={<FaUserPlus />} colorScheme="gray" onClick={handleSignup}>
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
      <HealthCheck />
    </VStack>
  );
};

const HealthCheck = () => {
  const [status, setStatus] = useState("");
  const checkHealth = async () => {
    try {
      const response = await fetch("https://backengine-l5hl.fly.dev/healthcheck");
      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      setStatus("Service Unavailable");
    }
  };

  return (
    <Box p={4}>
      <Button onClick={checkHealth} colorScheme="green">
        Check Service Health
      </Button>
      {status && <Text mt={2}>Service Status: {status}</Text>}
    </Box>
  );
};

export default Index;
