export function getAuthErrorMessage(error) {
  if (!error || !error.message) {
    return "Something went wrong. Please try again.";
  }

  const message = error.message.toLowerCase();

  // 🔐 Sign in errors
  if (message === "invalid login credentials") {
    return "Incorrect email or password.";
  }

  // 🧾 Signup errors
  if (message.includes("already registered")) {
    return "An account with this email already exists. Please sign in.";
  }

  // 📧 Email confirmation
  if (message.includes("email not confirmed")) {
    return "Please verify your email before signing in.";
  }

  // 🔑 Password rules
  if (message.includes("password")) {
    return "Password must be at least 6 characters.";
  }

  // 📬 Email validation
  if (message.includes("invalid email")) {
    return "Please enter a valid email address.";
  }

  // 🚦 Rate limiting
  if (message.includes("rate limit")) {
    return "Too many attempts. Please try again later.";
  }

  // ❗ Fallback (only if truly unknown)
  return "Unable to sign in. Please check your details and try again.";
}
