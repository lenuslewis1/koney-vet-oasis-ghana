import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { debugEmailJSSetup, testEmailJSConnection } from '@/utils/emailDebug';
import { initEmailJS } from '@/lib/emailService';

export const EmailJSTester = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<any>(null);

  const runDiagnostics = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      // Run configuration debug
      const configResult = debugEmailJSSetup();
      setConfig(configResult);
      
      // Attempt to initialize EmailJS
      const initResult = initEmailJS();
      
      // Test connection
      const testResult = await testEmailJSConnection();
      
      setResult(
        `Diagnostics complete:\n` +
        `- Public Key Found: ${configResult.hasPublicKey ? 'Yes' : 'No'}\n` +
        `- Public Key: ${configResult.publicKey || 'Not set'}\n` +
        `- EmailJS Initialized: ${initResult ? 'Success' : 'Failed'}\n` +
        `- Connection Test: ${testResult ? 'Passed' : 'Failed'}`
      );
    } catch (error) {
      console.error('Error during diagnostics:', error);
      setResult(`Error during diagnostics: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>EmailJS Configuration Tester</CardTitle>
        <CardDescription>
          Test your EmailJS configuration and diagnose any issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="font-medium mb-2">Current Configuration</h3>
            <p className="text-sm text-gray-700">
              <strong>Public Key:</strong> {import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Not set'}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Service ID:</strong> {import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_uehk5ke'}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Template ID:</strong> {import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_oqhdtrr'}
            </p>
          </div>
          
          {result && (
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="font-medium mb-2">Diagnostic Results</h3>
              <pre className="text-sm whitespace-pre-wrap bg-white p-3 rounded border">
                {result}
              </pre>
            </div>
          )}
          
          {config && (
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="font-medium mb-2">Environment Variables</h3>
              <pre className="text-sm whitespace-pre-wrap bg-white p-3 rounded border">
                {JSON.stringify(import.meta.env, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={runDiagnostics} 
          disabled={loading} 
          className="w-full"
        >
          {loading ? 'Running Diagnostics...' : 'Run Diagnostics'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmailJSTester;
