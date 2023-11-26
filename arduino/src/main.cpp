#include "Arduino.h"
#include "DHT.h"
#include "LED.h"
#include "info.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <iostream>
#include <string>

DHT dht(DHT_PIN_DATA, DHT11);
LED ledB(LEDB_PIN_VIN);
LED ledR(LEDR_PIN_VIN);

unsigned long lastTimeSettings = 0;
unsigned long lastTimeLogger= 0;
float upperThreshold;
float bottomThreshold;
bool settingsFlag = false;
bool loggerFlag = false;
String getSettings();

void setup() 
{
    Serial.begin(9600);
    while (!Serial) ;
    Serial.println("start");
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("WIFI Connected!");
    dht.begin();
    
}

void loop() 
{
    if (WiFi.status() == WL_CONNECTED) {
        WiFiClient client;
        HTTPClient http;
        //GET SETTINGS
        if (millis() - lastTimeSettings >= SETTINGS_DELAY) {
            http.begin(client, SETTINGS_PATH);
            int httpCode = http.GET();
            if (httpCode > 0) {
                String responsePayload = http.getString();
                Serial.println(responsePayload);
            } else {
                Serial.println("Error: " + httpCode);
            }
            http.end();
            lastTimeSettings = millis();
        }

        //POST LOGS
        if (millis() - lastTimeLogger >= LOGGER_DELAY) {
            http.begin(client, LOGGER_PATH);
            http.addHeader("Content-Type", "application/x-www-form-urlencoded");
            float lastTempCheck = dht.readTemperature();
            std::string logPost = "tempC=" + std::to_string(lastTempCheck);
            String logPostString = String(logPost.c_str());
            int httpCode = http.POST(logPostString);
            if (httpCode > 0) {
                Serial.println("Ok!");
            } else {
                Serial.println("Error: " + httpCode);
            }
            http.end();
            lastTimeLogger = millis();
        } 

    } else {
        Serial.println("WIFI Disconnected... Trying to reconnect!");
        WiFi.begin(SSID, PASSWORD);
        while (WiFi.status() != WL_CONNECTED) {
            delay(500);
            Serial.print(".");
        }
    }

}