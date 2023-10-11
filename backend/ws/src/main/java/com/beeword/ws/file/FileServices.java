package com.beeword.ws.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.stereotype.Service;

import com.beeword.ws.configuration.AppConfiguration;

@Service
public class FileServices {
	
	AppConfiguration appConfiguration;
	Tika tika;
	
	public FileServices(AppConfiguration appConfiguration) {
		super();
		this.appConfiguration = appConfiguration;
		this.tika = new Tika();
	}
	

	public String writeStringToFile(String image, String username) throws IOException {
		
		String fileName = generateRandomName();
		File target = new File(appConfiguration.getUploadPath() + "/"+fileName);
		OutputStream outputStream =  new FileOutputStream(target);
		
		byte[] base64Encoded = Base64.getDecoder().decode(image);
		
		outputStream.write(base64Encoded);
		outputStream.close();
		return fileName;
	}
	
	public String generateRandomName() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	public void deleteImage(String oldImageName) {
		if(oldImageName == null) {
			return;
		}
		
		String filePath = appConfiguration.getUploadPath() + "/" + oldImageName;
		
		try {
			Files.deleteIfExists(Paths.get(filePath));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String detectType(String value) {
		byte[] base64Encoded = Base64.getDecoder().decode(value);
		String fileType = tika.detect(base64Encoded);
		return fileType;
	}
	
}
