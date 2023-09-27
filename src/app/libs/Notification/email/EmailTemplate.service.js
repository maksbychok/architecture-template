const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

/**
 * Class representing a EmailTemplate
 * @class
 */
class EmailTemplateService {
  
  /**
   * Get email template path
   * @param templateName
   * @returns {string}
   */
  emailTemplatePath(templateName) {
    if (!templateName) {
      throw new Error('Doesnt exist template name');
    }
    return path.join(
      process.env.ROOT_DIR,
      `/public/resources/templates/emails/${templateName}.html`,
    );
  };
  
  /**
   * Set the selected html template and fill it with data
   * @param {Object} options
   * @returns {string}
   */
  setTemplateData(options) {
    const { templateName, dynamicTemplateData } = options;
    
    const templatePath = this.emailTemplatePath(templateName);
    const sourceHTML = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(sourceHTML);
    const view = { ...dynamicTemplateData }
    
    return template(view);
  }
  
}

module.exports = new EmailTemplateService();