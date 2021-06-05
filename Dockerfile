# yarn dev

FROM node:14

# make the 'app' folder the current working directory
# RUN mkdir -p /app
WORKDIR /app/

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# expose port 3000 to the host
EXPOSE 3000

CMD ["sh", "start_dev.sh"]