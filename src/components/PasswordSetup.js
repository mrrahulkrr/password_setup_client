import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  max-width: 400px;
  width: 90%;
  margin: 40px auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: 95%;
    padding: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 28px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 40px 12px 40px;
  border: 2px solid ${props => props.error ? '#ff4d4f' : '#d9d9d9'};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
  background-color: #f5f5f5;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #40a9ff;
    box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.2);
    background-color: #ffffff;
  }

  &::placeholder {
    color: #bfbfbf;
  }
`;

const InputIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #bfbfbf;
`;

const TogglePassword = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #bfbfbf;
  transition: color 0.3s;
  
  &:hover {
    color: #40a9ff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);

  &:hover {
    background-color: #40a9ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12);
  }

  &:active {
    background-color: #096dd9;
    transform: translateY(1px);
    box-shadow: none;
  }
`;

const Message = styled.p`
  color: ${props => props.error ? '#ff4d4f' : '#52c41a'};
  margin-top: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${props => props.error ? 'rgba(255, 77, 79, 0.1)' : 'rgba(82, 196, 26, 0.1)'};
`;

const PasswordStrengthMeter = styled.div`
  height: 4px;
  width: 100%;
  background-color: #f0f0f0;
  margin-top: 8px;
  border-radius: 2px;
  overflow: hidden;
`;

const PasswordStrengthIndicator = styled.div`
  height: 100%;
  width: ${props => props.strength}%;
  background-color: ${props => {
    if (props.strength < 33) return '#ff4d4f';
    if (props.strength < 66) return '#faad14';
    return '#52c41a';
  }};
  transition: all 0.3s;
`;

const PasswordSetup = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (pass) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(pass);
  };

  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (pass.match(/[A-Z]/)) strength += 25;
    if (pass.match(/[0-9]/)) strength += 25;
    if (pass.match(/[^A-Za-z0-9]/)) strength += 25;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include a number and a special character');
      return;
    }

    try {
      // Simulating API call to store password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Password set successfully. Redirecting to billing information...');
      
      // Redirect to billing information page after a short delay
      setTimeout(() => {
        window.location.href = '/billing-info';
      }, 2000);
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const passwordStrength = calculatePasswordStrength(password);

  return (
    <Container>
      <Title>Set Your Password</Title>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputIcon><Lock size={18} /></InputIcon>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TogglePassword type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </TogglePassword>
        </InputWrapper>
        <PasswordStrengthMeter>
          <PasswordStrengthIndicator strength={passwordStrength} />
        </PasswordStrengthMeter>
        <InputWrapper>
          <InputIcon><Lock size={18} /></InputIcon>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <TogglePassword type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </TogglePassword>
        </InputWrapper>
        <Button type="submit">Set Password</Button>
      </Form>
      {error && <Message error><AlertCircle size={16} style={{marginRight: '8px'}} /> {error}</Message>}
      {success && <Message><Check size={16} style={{marginRight: '8px'}} /> {success}</Message>}
    </Container>
  );
};

export default PasswordSetup;