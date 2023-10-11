import { useEffect, useState } from 'react';
import axios from "axios";

export const useApiProgress = (apiMethod ,apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {

        let numberRequest, numberResponse;

        const registerInterceptors = () => {
            numberRequest = axios.interceptors.request.use((request) => {
    
                if(request.url.startsWith(apiPath) && request.method === apiMethod) {
                    setPendingApiCall(true);
                }
                
                return request;
            });
    
            numberResponse = axios.interceptors.response.use((response) => {
    
                if(response.config.url.startsWith(apiPath) && response.config.method === apiMethod) {
                    setPendingApiCall(false);
                }
                
                return response;
    
            }, (error) => {
    
                if(error.config.url.startsWith(apiPath) && error.config.method === apiMethod) {
                    setPendingApiCall(false);
                }
                throw error;
    
            });
        }

        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(numberRequest);
            axios.interceptors.response.eject(numberResponse);
        }

        registerInterceptors();

        return function cleanup() {
            unregisterInterceptors();
        }

    }, [apiPath, apiMethod]);

    return pendingApiCall;
}