interface PasswordStrength {
  score: number;
  feedback: string;
}

export function checkPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  let feedback = '';

  // Length check
  if (password.length < 8) {
    return { score: 0, feedback: 'Password is too short' };
  } else if (password.length >= 12) {
    score += 1;
  }

  // Complexity checks
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Add points for complexity
  if (hasUpperCase) score += 1;
  if (hasLowerCase) score += 1;
  if (hasNumbers) score += 1;
  if (hasSpecialChars) score += 1;

  // Provide feedback based on missing criteria
  const missing = [];
  if (!hasUpperCase) missing.push('uppercase letter');
  if (!hasLowerCase) missing.push('lowercase letter');
  if (!hasNumbers) missing.push('number');
  if (!hasSpecialChars) missing.push('special character');

  if (missing.length > 0) {
    feedback = `Add ${missing.join(', ')} for stronger password`;
  }

  // Common patterns and sequences check
  const commonPatterns = [
    '123456', '12345', 'password', 'qwerty', 'admin', 
    'letmein', 'welcome', 'monkey', 'abc123', '111111'
  ];

  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    score = Math.max(0, score - 2);
    feedback = 'Avoid common password patterns';
  }

  // Repeated characters check
  const repeatedChars = /(.)\1{2,}/;
  if (repeatedChars.test(password)) {
    score = Math.max(0, score - 1);
    feedback = feedback || 'Avoid repeated characters';
  }

  // Sequential characters check
  const sequential = /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789/i;
  if (sequential.test(password)) {
    score = Math.max(0, score - 1);
    feedback = feedback || 'Avoid sequential characters';
  }

  // Normalize score to 0-4 range
  score = Math.min(4, Math.max(0, score));

  // If no specific feedback and score is good, provide positive feedback
  if (!feedback && score >= 3) {
    feedback = 'Strong password!';
  }

  return { score, feedback };
}
